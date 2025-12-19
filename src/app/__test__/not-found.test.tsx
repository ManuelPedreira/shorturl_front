import NotFound from "@/app/not-found";
import { render, screen } from "@testing-library/react";

jest.mock("@/ui/ErrorContainer/ErrorContainer", () => () => (
  <div data-testid="error-container"></div>
));

describe("NotFound", () => {
  it("renders the error page", () => {
    render(<NotFound />);

    const container = screen.getByTestId("error-container");

    expect(container).toBeInTheDocument();
  });
});
