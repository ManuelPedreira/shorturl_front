import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("../components/UrlInput/UrlForm", () => () => (
  <div data-testid="url-form-mock">UrlForm Component</div>
));

describe("Home", () => {
  it("renders the page", () => {
    render(<Home />);
    const title = screen.getByText("Short URL");
    expect(title).toBeInTheDocument();
  });

  it("renders the form", () => {
    render(<Home />);
    const urlForm = screen.getByTestId("url-form-mock");
    expect(urlForm).toBeInTheDocument();
  });
});
