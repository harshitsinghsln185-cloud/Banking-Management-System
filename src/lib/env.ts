import { z } from "zod";

const emptyStringToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),

  // Authentication & Security
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  CRON_SECRET: z.string().min(1, "CRON_SECRET is required"),
  KYC_ENCRYPTION_KEY: z
    .string()
    .min(1, "KYC_ENCRYPTION_KEY is required")
    .refine(
      (val) => {
        const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        if (!base64Regex.test(val)) return false;
        try {
          const buffer = Buffer.from(val, "base64");
          return buffer.length === 32;
        } catch {
          return false;
        }
      },
      {
        message: "KYC_ENCRYPTION_KEY must be a valid base64 string of exactly 32 bytes",
      }
    ),

  // Admin Credentials
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email address"),
  ADMIN_PASSWORD: z.string().min(1, "ADMIN_PASSWORD is required"),

  // Application
  APP_URL: z.string().url("APP_URL must be a valid URL"),

  // Email (SMTP) - Optional until email integration phase
  SMTP_HOST: z.preprocess(emptyStringToUndefined, z.string().optional()),
  SMTP_PORT: z.preprocess(emptyStringToUndefined, z.coerce.number().int().positive().optional()),
  SMTP_USER: z.preprocess(emptyStringToUndefined, z.string().optional()),
  SMTP_PASS: z.preprocess(emptyStringToUndefined, z.string().optional()),
  EMAIL_FROM: z.preprocess(emptyStringToUndefined, z.string().optional()),

  // Cloudinary - Optional until storage/upload phase
  CLOUDINARY_CLOUD_NAME: z.preprocess(emptyStringToUndefined, z.string().optional()),
  CLOUDINARY_API_KEY: z.preprocess(emptyStringToUndefined, z.string().optional()),
  CLOUDINARY_API_SECRET: z.preprocess(emptyStringToUndefined, z.string().optional()),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(rawEnv: Record<string, string | undefined> = process.env): Env {
  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "variable"}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `Invalid environment configuration. Missing or invalid variables:\n${errorDetails}`
    );
  }

  return result.data;
}

// Lazy getter or direct export for runtime access
let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}
