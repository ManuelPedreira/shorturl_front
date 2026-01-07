import { render, screen } from "@testing-library/react";
import { cookies } from "next/headers";
import SuccessPage from "../page";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("../components/UrlDetails/UrlDetails", () => ({ urlCode }: { urlCode: string }) => (
  <div data-testid="url-details">{urlCode}</div>
));

jest.mock("../components/CopyButton/CopyButton", () => ({ value }: { value: string }) => (
  <button data-testid="copy-button">{value}</button>
));

const setMockCookieValues = (mockShortUrlData: any) => {
  const cookieValue = {
    get: () => ({ value: JSON.stringify(mockShortUrlData) }),
  } as any;

  jest.mocked(cookies).mockResolvedValue(cookieValue);
};

const validCookieValues = {
  shortUrl: "https://short.com/abc123",
  originalUrl: "https://www.example.com/very/long/url",
  shortCode: "abc123",
};

describe("SuccessPage", () => {
  it("renders the page with data", async () => {
    setMockCookieValues(validCookieValues);
    render(await SuccessPage());

    const shortUrl = screen.getByRole("link", { name: validCookieValues.shortUrl });
    const originalUrl = screen.getByText(validCookieValues.originalUrl);

    expect(shortUrl).toBeInTheDocument();
    expect(originalUrl).toBeInTheDocument();
  });

  it("renders the UrlDetails with values", async () => {
    setMockCookieValues(validCookieValues);
    render(await SuccessPage());

    const component = screen.getByTestId("url-details");

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(validCookieValues.shortCode);
  });

  it("renders the CopyButton with values", async () => {
    setMockCookieValues(validCookieValues);
    render(await SuccessPage());

    const component = screen.getByTestId("copy-button");

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent(validCookieValues.shortUrl);
  });

  it("links back to home", async () => {
    setMockCookieValues(validCookieValues);
    render(await SuccessPage());

    const link = screen.getByLabelText("go-back-link");

    expect(link).toHaveAttribute("href", "/");
  });
});
