export function validateConfig(): string[] {
  const warnings: string[] = [];
  if (!process.env.OPENAI_API_KEY) {
    warnings.push("OPENAI_API_KEY is not set in environment variables.");
  }
  return warnings;
}
