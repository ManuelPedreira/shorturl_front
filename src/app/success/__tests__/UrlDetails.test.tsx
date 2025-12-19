import { render, screen } from "@testing-library/react";
import UrlDetails from "../components/UrlDetails/UrlDetails";
import { useUrlUpdates } from "@/hooks/useUrlUpdates";

jest.mock("@/hooks/useUrlUpdates", () => ({
  useUrlUpdates: jest.fn(),
}));

const mockedUseUrlUpdates = useUrlUpdates as jest.MockedFunction<typeof useUrlUpdates>;

describe("Render UrlDetails", () => {
  beforeEach(() => {
    mockedUseUrlUpdates.mockClear();
  });

  it("renders the page", () => {
    mockedUseUrlUpdates.mockReturnValue({
      message: {
        title: "title",
        description: "description",
        imageUrl: "www.example.es/image.jpg",
        shortCode: "abcd123",
        originalUrl: "www.example.es",
        status: "done",
      },
    });

    render(<UrlDetails urlCode="" />);
    const title = screen.queryByRole("heading");
    expect(title).toBeInTheDocument();
  });

  it("doesn't render when message is null", () => {
    mockedUseUrlUpdates.mockReturnValue({
      message: null,
    });

    render(<UrlDetails urlCode="" />);
    const title = screen.queryByRole("heading");
    expect(title).not.toBeInTheDocument();
  });
});
