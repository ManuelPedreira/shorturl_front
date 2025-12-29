import { render, screen } from "@testing-library/react";
import ErrorContainer from "../ErrorContainer";

const errorMessage = "error-message";
const children = <span data-testid={errorMessage} />;

describe("ErrorContainer", () => {
  it("renders main elements", () => {
    render(<ErrorContainer>{children}</ErrorContainer>);

    const tittle = screen.getByRole("heading", { level: 1 });
    const message = screen.getByTestId(errorMessage);
    const button = screen.getByLabelText("go-back-button");

    expect(tittle).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("links back to home", () => {
    render(<ErrorContainer>{children}</ErrorContainer>);

    const link = screen.getByLabelText("go-back-link");

    expect(link).toHaveAttribute("href", "/");
  });
});
