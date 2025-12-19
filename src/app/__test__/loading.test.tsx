import { render, screen } from "@testing-library/react";
import GlobalLoading from "../loading";

jest.mock("@/ui/LoadingContainer/LoadingContainer", () => () => (
  <div data-testid="loading-container"></div>
));

describe("GlobalLoading", () => {
  it("renders the loading page", () => {
    render(<GlobalLoading />);

    const container = screen.getByTestId("loading-container");

    expect(container).toBeInTheDocument();
  });
});
