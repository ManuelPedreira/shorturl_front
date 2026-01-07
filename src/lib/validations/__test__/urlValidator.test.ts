import urlValidator from "../urlValidator";

describe("urlValidator", () => {
  it("accepts a valid urls, IPs, subdomains and params", () => {
    const urls = [
      "http://example.com",
      "http://192.168.0.1:80",
      "https://api.first.second.example.com/path?param1=value1&param2=value",
    ];

    urls.forEach((url) => {
      const result = urlValidator(url);

      expect(result.success).toBe(true);
      expect(result.data?.url).toEqual(url);
      expect(result.error?.parsedError).toBeUndefined();
    });
  });

  it("adds https protocol when missing", () => {
    const url = "example.com";

    const result = urlValidator(url);

    expect(result.success).toBe(true);
    expect(result.data?.url).toBe(`https://${url}`);
    expect(result.error?.parsedError).toBeUndefined();
  });

  it("returns error for invalid or malformed urls", () => {
    const shortUrls = ["", " ", "123", "a.e", "http://", "https://a.e"];
    const invalidUrls = ["example,com", "not-a-url"];
    const urls = [...shortUrls, ...invalidUrls, null];

    urls.forEach((url) => {
      const result = urlValidator(url);

      expect(result.success).toBe(false);
      expect(result.error.parsedError).toBeTruthy();
    });
  });
});
