import { render, screen } from "@testing-library/react";
import SuccessError from "../error";

jest.mock("@/ui/ErrorContainer/ErrorContainer", () => () => (
  <div data-testid="error-container"></div>
));

describe("SuccessError", () => {
  it("renders the error page", () => {
    render(<SuccessError />);
    const title = screen.getByTestId("error-container");
    expect(title).toBeInTheDocument();
  });
});
