import RootLayout from "@/app/layout";
import { render, screen } from "@testing-library/react";

jest.mock("@/ui/Navbar/Navbar", () => () => <div data-testid="navbar-container" />);

jest.mock("@/ui/Footer/Footer", () => () => <div data-testid="footer-container" />);

describe("RootLayout", () => {
  const childrenContainer = <div data-testid="children-container" />;

  it("renders the layout", () => {
    render(<RootLayout children={childrenContainer} />);

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });

  it("renders the children", () => {
    render(<RootLayout children={childrenContainer} />);

    const children = screen.getByTestId("children-container");

    expect(children).toBeInTheDocument();
  });

  it("renders the navbar", () => {
    render(<RootLayout children={childrenContainer} />);

    const navbar = screen.getByTestId("navbar-container");

    expect(navbar).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<RootLayout children={childrenContainer} />);

    const footer = screen.getByTestId("footer-container");

    expect(footer).toBeInTheDocument();
  });
});
