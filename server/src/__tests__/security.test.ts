import { describe, it, expect } from "bun:test";
import { sanitize, validateBody } from "../middleware/security";

describe("sanitize.string", () => {
  it("removes angle brackets from input", () => {
    expect(sanitize.string("<script>alert('xss')</script>")).toBe(
      "scriptalert('xss')/script",
    );
  });

  it("trims whitespace", () => {
    expect(sanitize.string("  hello world  ")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(sanitize.string("")).toBe("");
  });

  it("preserves safe characters", () => {
    expect(sanitize.string("Hello, World! #1 @user")).toBe(
      "Hello, World! #1 @user",
    );
  });

  it("removes only < and > while keeping other special chars", () => {
    expect(sanitize.string('a < b > c & "d"')).toBe('a  b  c & "d"');
  });
});

describe("sanitize.url", () => {
  it("accepts valid http URL", () => {
    expect(sanitize.url("http://example.com")).toBe("http://example.com/");
  });

  it("accepts valid https URL", () => {
    expect(sanitize.url("https://example.com/path?q=1")).toBe(
      "https://example.com/path?q=1",
    );
  });

  it("rejects javascript: protocol", () => {
    expect(sanitize.url("javascript:alert(1)")).toBeNull();
  });

  it("rejects ftp: protocol", () => {
    expect(sanitize.url("ftp://files.example.com")).toBeNull();
  });

  it("rejects invalid URL", () => {
    expect(sanitize.url("not a url")).toBeNull();
  });

  it("rejects file: protocol", () => {
    expect(sanitize.url("file:///etc/passwd")).toBeNull();
  });

  it("handles URL with port number", () => {
    expect(sanitize.url("https://localhost:3000/api")).toBe(
      "https://localhost:3000/api",
    );
  });
});

describe("sanitize.email", () => {
  it("accepts valid email", () => {
    expect(sanitize.email("User@Example.COM")).toBe("user@example.com");
  });

  it("trims whitespace from email", () => {
    expect(sanitize.email("  test@test.com  ")).toBe("test@test.com");
  });

  it("rejects email without @", () => {
    expect(sanitize.email("invalid")).toBeNull();
  });

  it("rejects email without domain", () => {
    expect(sanitize.email("user@")).toBeNull();
  });

  it("rejects email with spaces in middle", () => {
    expect(sanitize.email("user @example.com")).toBeNull();
  });

  it("rejects empty string", () => {
    expect(sanitize.email("")).toBeNull();
  });
});

describe("sanitize.integer", () => {
  it("parses valid integer string", () => {
    expect(sanitize.integer("42")).toBe(42);
  });

  it("accepts number directly", () => {
    expect(sanitize.integer(7)).toBe(7);
  });

  it("rejects non-integer string", () => {
    expect(sanitize.integer("abc")).toBeNull();
  });

  it("parses float string by truncating to integer (parseInt behavior)", () => {
    expect(sanitize.integer("3.14")).toBe(3);
  });

  it("rejects NaN", () => {
    expect(sanitize.integer(NaN)).toBeNull();
  });

  it("enforces min constraint", () => {
    expect(sanitize.integer(5, 10)).toBeNull();
  });

  it("enforces max constraint", () => {
    expect(sanitize.integer(100, 0, 50)).toBeNull();
  });

  it("passes when within range", () => {
    expect(sanitize.integer(25, 0, 50)).toBe(25);
  });

  it("accepts boundary values", () => {
    expect(sanitize.integer(0, 0, 100)).toBe(0);
    expect(sanitize.integer(100, 0, 100)).toBe(100);
  });

  it("handles negative integers", () => {
    expect(sanitize.integer("-5")).toBe(-5);
  });
});

describe("validateBody", () => {
  it("returns valid when all fields pass", () => {
    const body = { name: "John", age: 25 };
    const schema = {
      name: (val: any) => typeof val === "string" && val.length > 0,
      age: (val: any) => typeof val === "number" && val > 0,
    };

    const result = validateBody(body, schema);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("returns errors for invalid fields", () => {
    const body = { name: "", age: -1 };
    const schema = {
      name: (val: any) => typeof val === "string" && val.length > 0,
      age: (val: any) => typeof val === "number" && val > 0,
    };

    const result = validateBody(body, schema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid field: name");
    expect(result.errors).toContain("Invalid field: age");
  });

  it("handles missing fields", () => {
    const body = {};
    const schema = {
      name: (val: any) => typeof val === "string",
    };

    const result = validateBody(body, schema);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Invalid field: name");
  });

  it("handles empty schema", () => {
    const body = { anything: "value" };
    const schema = {};

    const result = validateBody(body, schema);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
