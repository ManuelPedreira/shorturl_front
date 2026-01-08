import { renderHook } from "@testing-library/react";
import { useUrlUpdates } from "../useUrlUpdates";
import apiWebSocket from "@/lib/api/apiWebSocket";

jest.mock("@/lib/api/apiWebSocket", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockApiWebSocket = apiWebSocket as jest.MockedFunction<typeof apiWebSocket>;

describe("useUrlUpdates", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with null message", () => {
    const { result } = renderHook(() => useUrlUpdates("abc123"));

    expect(result.current.message).toBeNull();
  });

  it("should call apiWebSocket with shortCode on mount", () => {
    renderHook(() => useUrlUpdates("abc123"));

    expect(mockApiWebSocket).toHaveBeenCalled();
    expect(mockApiWebSocket).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCode: "abc123",
      })
    );
  });

  it("should call apiWebSocket when shortCode changes", () => {
    const { rerender } = renderHook(({ shortCode }) => useUrlUpdates(shortCode), {
      initialProps: { shortCode: "code1" },
    });

    expect(mockApiWebSocket).toHaveBeenCalledTimes(1);
    expect(mockApiWebSocket).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCode: "code1",
      })
    );

    rerender({ shortCode: "code2" });

    expect(mockApiWebSocket).toHaveBeenCalledTimes(2);
    expect(mockApiWebSocket).toHaveBeenCalledWith(
      expect.objectContaining({
        shortCode: "code2",
      })
    );
  });
});
