import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

function getDevTransport() {
  if (!isDev) return undefined;
  try {
    require.resolve("pino-pretty");
    return {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    };
  } catch {
    return undefined;
  }
}

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  redact: {
    paths: [
      "password",
      "*.password",
      "*.*.password",
      "pin",
      "*.pin",
      "*.*.pin",
      "otp",
      "*.otp",
      "*.*.otp",
      "token",
      "*.token",
      "*.*.token",
      "authorization",
      "*.authorization",
      "*.*.authorization",
      "headers.authorization",
      "aadhaar",
      "*.aadhaar",
      "*.*.aadhaar",
      "pan",
      "*.pan",
      "*.*.pan",
    ],
    censor: "[REDACTED]",
  },
  transport: getDevTransport(),
});
