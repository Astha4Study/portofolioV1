import "dotenv/config";
import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import { prisma } from "./lib/prisma.js";
import app from "./index";

const port = parseInt(env.get("PORT") || "3000", 10);

console.log(`Starting server on port ${port}`);

// Graceful shutdown handler
const shutdown = async (signal: string) => {
  logger.info(`${signal} received, starting graceful shutdown`);

  try {
    // Close database connections
    await prisma.$disconnect();
    logger.info("Database connections closed");

    logger.info("Server shutdown complete");
    process.exit(0);
  } catch (error) {
    logger.error("Error during shutdown", error as Error);
    process.exit(1);
  }
};

// Register shutdown handlers
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception", error);
  shutdown("uncaughtException");
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  logger.error("Unhandled rejection", new Error(String(reason)));
});

export default {
  port,
  fetch: app.fetch,
};
