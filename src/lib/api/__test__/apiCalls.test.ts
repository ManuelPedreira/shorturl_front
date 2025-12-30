import { createUrl } from "../apiCalls";
import api from "../apiConfig";
import { CreateURLRequest, CreateURLResponse } from "../apiTypes";

jest.mock("../apiConfig", () => ({
  post: jest.fn(),
}));

const request: CreateURLRequest = {
  url: "https://example.com",
};

const responseData: CreateURLResponse = {
  shortUrl: "https://short.com/abc123",
  shortCode: "abc123",
  originalUrl: "https://example.com",
};

describe("createUrl", () => {
  const apiMock = api.post as jest.Mock;

  it("calls api.post and returns response data", async () => {
    apiMock.mockResolvedValue({ data: responseData });

    const result = await createUrl(request);

    expect(api.post).toHaveBeenCalledWith("/api", request);
    expect(result).toEqual(responseData);
  });

  it("throws when api.post fails", async () => {
    const error = new Error("Invalid request");
    apiMock.mockRejectedValue(error);

    const result = createUrl(request);

    expect(result).rejects.toThrow("Invalid request");
  });
});
