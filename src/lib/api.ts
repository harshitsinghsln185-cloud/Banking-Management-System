import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import { logger } from "@/lib/logger";

export class AppError extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(code: string, status: number, message: string) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    errors?: Record<string, string[] | undefined>;
  };
}

export function ok<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function fail(
  code: string,
  message: string,
  status: number,
  errors?: Record<string, string[] | undefined>
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(errors ? { errors } : {}),
      },
    },
    { status }
  );
}

export type ApiHandler = (req: NextRequest, context?: unknown) => Promise<Response> | Response;

/**
 * Route handler wrapper that catches AppError, ZodError, and unhandled exceptions,
 * converting them into standardized API error responses.
 */
export function withApi(
  handler: ApiHandler
): (req: NextRequest, context?: unknown) => Promise<Response> {
  return async (req: NextRequest, context?: unknown): Promise<Response> => {
    try {
      return await handler(req, context);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        return fail(err.code, err.message, err.status);
      }

      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const message =
          err.issues.map((i) => `${i.path.join(".") || "field"}: ${i.message}`).join(", ") ||
          "Validation error";
        return fail("VALIDATION_ERROR", message, 400, fieldErrors);
      }

      logger.error({ err }, "Unhandled API error");
      return fail("INTERNAL_SERVER_ERROR", "Internal server error", 500);
    }
  };
}
