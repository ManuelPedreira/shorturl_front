import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";
import { getLocale, getMessages } from "next-intl/server";

jest.mock("@/ui/Navbar/Navbar", () => () => <div data-testid="navbar-container" />);
jest.mock("@/ui/Footer/Footer", () => () => <div data-testid="footer-container" />);

describe("RootLayout", () => {
  const children = <div data-testid="children-container" />;

  it("renders the layout", async () => {
    render(await RootLayout({ children }));

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });

  it("renders the children", async () => {
    render(await RootLayout({ children }));

    const childrenContainer = screen.getByTestId("children-container");

    expect(childrenContainer).toBeInTheDocument();
  });

  it("renders the navbar", async () => {
    render(await RootLayout({ children }));

    const navbar = screen.getByTestId("navbar-container");

    expect(navbar).toBeInTheDocument();
  });

  it("renders the footer", async () => {
    render(await RootLayout({ children }));

    const footer = screen.getByTestId("footer-container");

    expect(footer).toBeInTheDocument();
  });
});
