/**
 * Client-side environment configuration with validation
 */

interface ClientEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  VITE_API_URL: string;
}

class ClientEnvValidator {
  private static instance: ClientEnvValidator;
  private config: ClientEnv;

  private constructor() {
    this.config = this.validateEnv();
  }

  static getInstance(): ClientEnvValidator {
    if (!ClientEnvValidator.instance) {
      ClientEnvValidator.instance = new ClientEnvValidator();
    }
    return ClientEnvValidator.instance;
  }

  private validateEnv(): ClientEnv {
    const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY", "VITE_API_URL"];

    const missing: string[] = [];

    for (const key of required) {
      if (!import.meta.env[key]) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      const errorMsg = `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }

    // Validate URLs
    try {
      new URL(import.meta.env.VITE_SUPABASE_URL);
      new URL(import.meta.env.VITE_API_URL);
    } catch (error) {
      throw new Error("Invalid URL in environment variables");
    }

    return {
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
      VITE_API_URL: import.meta.env.VITE_API_URL,
    };
  }

  get<K extends keyof ClientEnv>(key: K): ClientEnv[K] {
    return this.config[key];
  }

  getAll(): Readonly<ClientEnv> {
    return { ...this.config };
  }
}

export const clientEnv = ClientEnvValidator.getInstance();

// Backward compatibility exports
export const API_URL = clientEnv.get("VITE_API_URL");
export const SUPABASE_URL = clientEnv.get("VITE_SUPABASE_URL");
export const SUPABASE_ANON_KEY = clientEnv.get("VITE_SUPABASE_ANON_KEY");
