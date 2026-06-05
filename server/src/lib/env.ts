/**
 * Environment variable validation and type-safe access
 */

interface EnvConfig {
  // Database
  DATABASE_URL: string;
  DIRECT_URL?: string;

  // Supabase
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;

  // GitHub
  GITHUB_APP_ID: string;
  GITHUB_PRIVATE_KEY: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_USER_TOKEN: string;

  // WakaTime
  WAKATIME_API_KEY: string;

  // Server
  NODE_ENV: "development" | "production" | "test";
  PORT?: string;
  ALLOWED_ORIGINS?: string;
}

class EnvValidator {
  private static instance: EnvValidator;
  private config: EnvConfig;

  private constructor() {
    this.config = this.validateEnv();
  }

  static getInstance(): EnvValidator {
    if (!EnvValidator.instance) {
      EnvValidator.instance = new EnvValidator();
    }
    return EnvValidator.instance;
  }

  private validateEnv(): EnvConfig {
    const required = ["DATABASE_URL", "SUPABASE_URL", "SUPABASE_ANON_KEY", "GITHUB_APP_ID", "GITHUB_PRIVATE_KEY", "GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET", "GITHUB_USER_TOKEN", "WAKATIME_API_KEY"];

    const missing: string[] = [];

    for (const key of required) {
      if (!process.env[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}`);
    }

    return {
      DATABASE_URL: process.env.DATABASE_URL!,
      DIRECT_URL: process.env.DIRECT_URL,
      SUPABASE_URL: process.env.SUPABASE_URL!,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
      GITHUB_APP_ID: process.env.GITHUB_APP_ID!,
      GITHUB_PRIVATE_KEY: process.env.GITHUB_PRIVATE_KEY!,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID!,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
      GITHUB_USER_TOKEN: process.env.GITHUB_USER_TOKEN!,
      WAKATIME_API_KEY: process.env.WAKATIME_API_KEY!,
      NODE_ENV: (process.env.NODE_ENV as any) || "development",
      PORT: process.env.PORT || "3000",
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    };
  }

  get<K extends keyof EnvConfig>(key: K): EnvConfig[K] {
    return this.config[key];
  }

  getAll(): Readonly<EnvConfig> {
    return { ...this.config };
  }
}

export const env = EnvValidator.getInstance();
