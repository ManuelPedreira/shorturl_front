import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("../components/UrlForm/UrlForm", () => () => (
  <div data-testid="url-form-mock">UrlForm Component</div>
));

describe("Home", () => {
  it("renders the page", async () => {
    render(await Home());
    
    const title = screen.getByLabelText("title");
    
    expect(title).toBeInTheDocument();
  });
  
  it("renders the form", async () => {
    render(await Home());

    const urlForm = screen.getByTestId("url-form-mock");

    expect(urlForm).toBeInTheDocument();
  });
});
