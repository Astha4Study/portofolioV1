import { describe, it, expect, beforeEach, afterEach, spyOn } from "bun:test";
import { logger } from "../lib/logger";

describe("logger", () => {
  let consoleSpy: ReturnType<typeof spyOn>;
  let consoleErrorSpy: ReturnType<typeof spyOn>;
  let consoleWarnSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    consoleSpy = spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe("info", () => {
    it("logs JSON with level info", () => {
      logger.info("test message");

      expect(consoleSpy).toHaveBeenCalledTimes(1);
      const output = JSON.parse(consoleSpy.mock.calls[0][0] as string);
      expect(output.level).toBe("info");
      expect(output.message).toBe("test message");
      expect(output.timestamp).toBeDefined();
    });

    it("includes metadata when provided", () => {
      logger.info("msg", { userId: "123", action: "login" });

      const output = JSON.parse(consoleSpy.mock.calls[0][0] as string);
      expect(output.userId).toBe("123");
      expect(output.action).toBe("login");
    });

    it("outputs valid ISO timestamp", () => {
      logger.info("timestamp test");

      const output = JSON.parse(consoleSpy.mock.calls[0][0] as string);
      const date = new Date(output.timestamp);
      expect(date.toISOString()).toBe(output.timestamp);
    });
  });

  describe("error", () => {
    it("logs JSON with level error", () => {
      logger.error("error message");

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      const output = JSON.parse(consoleErrorSpy.mock.calls[0][0] as string);
      expect(output.level).toBe("error");
      expect(output.message).toBe("error message");
    });

    it("includes error details when Error is provided", () => {
      const err = new Error("something failed");
      logger.error("caught error", err);

      const output = JSON.parse(consoleErrorSpy.mock.calls[0][0] as string);
      expect(output.error.name).toBe("Error");
      expect(output.error.message).toBe("something failed");
      expect(output.error.stack).toBeDefined();
    });

    it("handles undefined error parameter", () => {
      logger.error("no error object", undefined);

      const output = JSON.parse(consoleErrorSpy.mock.calls[0][0] as string);
      expect(output.error).toBeUndefined();
    });

    it("includes metadata alongside error", () => {
      const err = new Error("fail");
      logger.error("with meta", err, { requestId: "abc" });

      const output = JSON.parse(consoleErrorSpy.mock.calls[0][0] as string);
      expect(output.requestId).toBe("abc");
      expect(output.error.message).toBe("fail");
    });
  });

  describe("warn", () => {
    it("logs JSON with level warn", () => {
      logger.warn("warning message");

      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
      const output = JSON.parse(consoleWarnSpy.mock.calls[0][0] as string);
      expect(output.level).toBe("warn");
      expect(output.message).toBe("warning message");
      expect(output.timestamp).toBeDefined();
    });

    it("includes metadata when provided", () => {
      logger.warn("rate limited", { ip: "1.2.3.4" });

      const output = JSON.parse(consoleWarnSpy.mock.calls[0][0] as string);
      expect(output.ip).toBe("1.2.3.4");
    });
  });
});
