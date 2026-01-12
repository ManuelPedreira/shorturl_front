import { render, screen } from "@testing-library/react";
import ErrorContainer from "../ErrorContainer";

const errorMessage = "error-message";

describe("ErrorContainer", () => {
  it("renders main elements", () => {
    render(
      <ErrorContainer
        title="title"
        text="text"
        description={errorMessage}
        goBackButtonText="goBackButtonText"
      />
    );

    const tittle = screen.getByRole("heading", { level: 1 });
    const message = screen.getByText(errorMessage);
    const button = screen.getByLabelText("go-back-button");

    expect(tittle).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("links back to home", () => {
    render(
      <ErrorContainer
        title="title"
        text="text"
        description="description"
        goBackButtonText="goBackButtonText"
      />
    );

    const link = screen.getByLabelText("go-back-link");

    expect(link).toHaveAttribute("href", "/");
  });
});
