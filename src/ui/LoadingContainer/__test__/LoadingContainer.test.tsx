import { render, screen } from "@testing-library/react";
import LoadingContainer from "../LoadingContainer";

describe("LoadingContainer", () => {
  it("renders main elements", () => {
    render(<LoadingContainer />);

    const spinner = screen.getByLabelText("loading-spinner");

    expect(spinner).toBeInTheDocument();
  });
});