import createNewUrl from "../createNewUrl";
import { createUrl } from "@/lib/api/apiCalls";
import urlValidator from "@/lib/validations/urlValidator";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import { CreateURLRequest, CreateURLResponse } from "@/lib/api/apiTypes";

jest.unmock("@/lib/actions/createNewUrl");

jest.mock("@/lib/api/apiCalls");
jest.mock("@/lib/validations/urlValidator");

jest.mock("next/headers");
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("jose", () => {
  function MockSignJWT(this: any) {
    this.setProtectedHeader = jest.fn(() => this);
    this.setIssuedAt = jest.fn(() => this);
    this.setExpirationTime = jest.fn(() => this);
    this.sign = jest.fn().mockResolvedValue("mock-jwt");
    return this;
  }
  return { SignJWT: MockSignJWT };
});

// ─── Polyfill necesario ───────────────────────────────
if (!global.TextEncoder) {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// ─── Helpers ──────────────────────────────────────────
const formDataWithUrl = (url: string) => {
  const fd = new FormData();
  fd.set("url", url);
  return fd;
};

const responseData: CreateURLResponse = {
  shortUrl: "https://short.com/abc123",
  shortCode: "abc123",
  originalUrl: "https://example.com",
};

describe("createNewUrl", () => {
  const mockCreateUrl = createUrl as jest.Mock;
  const mockValidator = urlValidator as jest.Mock;
  const mockCookies = cookies as jest.Mock;
  const cookieStore = { set: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    mockCookies.mockResolvedValue(cookieStore);
    process.env.JWT_WS_SECRET = "test-secret";
    process.env.TEMPORAL_COOKIE_EXPIRATION_TIME = "300";
  });

  it("returns validation error", async () => {
    mockValidator.mockReturnValue({
      success: false,
      error: { parsedError: "invalid-url" },
    });

    const result = await createNewUrl(null as any, formDataWithUrl("bad"));

    expect(result).toEqual({
      success: false,
      errors: "invalid-url",
    });
    expect(mockCreateUrl).not.toHaveBeenCalled();
  });

  it("redirects on success", async () => {
    mockValidator.mockReturnValue({
      success: true,
      data: responseData,
    });
    mockCreateUrl.mockResolvedValue(responseData);

    await createNewUrl(null as any, formDataWithUrl(responseData.originalUrl));

    expect(mockCreateUrl).toHaveBeenCalled();
    expect(cookieStore.set).toHaveBeenCalledTimes(2);
    expect(redirect).toHaveBeenCalled();
  });

  it("returns axios error", async () => {
    const axiosError = new AxiosError("Error");
    axiosError.response = { data: { detail: "Server error" } } as any;

    mockValidator.mockReturnValue({
      success: true,
      data: responseData,
    });
    mockCreateUrl.mockRejectedValue(axiosError);

    const result = await createNewUrl(null as any, formDataWithUrl(responseData.originalUrl));

    expect(result).toEqual({
      success: false,
      errors: "Server error",
    });
  });

  it("rethrows non-Axios errors", () => {
    mockValidator.mockReturnValue({});
    mockCreateUrl.mockRejectedValue(new Error("Error"));

    const result = createNewUrl(null as any, formDataWithUrl(responseData.originalUrl));

    expect(result).rejects.toThrow("Error");
  });
});
