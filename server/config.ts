// server/config.ts

export interface ConfigWarning {
  message: string;
}

export function validateConfig(): ConfigWarning[] {
  const warnings: ConfigWarning[] = [];

  if (!process.env.OPENAI_API_KEY) {
    warnings.push({ message: "OPENAI_API_KEY is not set in environment variables." });
  }

  // Add other checks here (database URL, secrets, etc.)
  return warnings;
}
