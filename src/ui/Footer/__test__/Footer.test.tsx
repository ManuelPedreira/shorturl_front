import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders main component and external GitHub link", async () => {
    render(await Footer());

    const link = screen.getByRole(("link"));

    expect(link).toHaveAttribute("href", "https://github.com/ManuelPedreira");
  });
});
