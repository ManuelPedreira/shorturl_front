import { getByText, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

jest.mock("@/assets/logo.svg", () => {
  return () => <svg data-testid="logo" />;
});

const logos = ["home-logo", "github-link"];
const navigationElements = [
  { text: "item1", url: "/item1" },
  { text: "item2", url: "/item2" },
  { text: "item3", url: "/item3", title: "title3" },
];

describe("Navbar", () => {
  it("renders logo links", () => {
    render(<Navbar elements={navigationElements} />);

    const logoLinks = logos.map((logo) => screen.getByLabelText(logo));

    logoLinks.forEach((link) => expect(link.querySelector("svg")).toBeInTheDocument());
  });

  it("renders navigation links from elements", () => {
    render(<Navbar elements={navigationElements} />);

    navigationElements.forEach((element) => {
      const link = screen.getByRole("link", { name: element.text });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", element.url);
      if (element.title) expect(link).toHaveAttribute("title", element.title);
    });
  });
});
