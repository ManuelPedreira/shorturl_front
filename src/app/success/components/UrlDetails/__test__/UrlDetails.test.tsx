import { render, screen } from "@testing-library/react";
import UrlDetails from "../UrlDetails";
import { useUrlUpdates } from "@/hooks/useUrlUpdates";

jest.mock("@/hooks/useUrlUpdates", () => ({
  useUrlUpdates: jest.fn(),
}));

const mockedUseUrlUpdates = useUrlUpdates as jest.MockedFunction<typeof useUrlUpdates>;
const emptyValue = { message: null };
const validValue = {
  message: {
    title: "title",
    description: "description",
    imageUrl: "www.example.es/image.jpg",
    shortCode: "abcd123",
    originalUrl: "www.example.es",
    status: "done",
  },
};
const getTitle = () => screen.queryByRole("heading");

describe("Render UrlDetails", () => {
  beforeEach(() => {
    mockedUseUrlUpdates.mockClear();
  });

  it("renders the page", () => {
    mockedUseUrlUpdates.mockReturnValue(validValue);
    render(<UrlDetails urlCode="" />);

    const title = getTitle();

    expect(title).toBeInTheDocument();
  });

  it("doesn't render when message is null", () => {
    mockedUseUrlUpdates.mockReturnValue(emptyValue);
    render(<UrlDetails urlCode="" />);

    const title = getTitle();

    expect(title).not.toBeInTheDocument();
  });
});
