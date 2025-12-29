import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("ErrorContainer", () => {
  it("renders main elements", () => {
    render(<Footer />);

    const text = screen.getByText(/Manuel Pedreira/);

    expect(text).toBeInTheDocument();
  });

  it("contains external GitHub link", () => {
    render(<Footer />);

    const link = screen.getByRole(("link"));

    expect(link).toHaveAttribute("href", "https://github.com/ManuelPedreira");
  });
});
