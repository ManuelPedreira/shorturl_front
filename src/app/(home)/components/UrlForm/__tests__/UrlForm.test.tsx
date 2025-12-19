import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UrlForm from "../UrlForm";
import React from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

const mockUseActionState = React.useActionState as jest.MockedFunction<typeof React.useActionState>;

const getUrlInput = () => screen.getByLabelText("short-url-input");
const getSubmitButton = () => screen.getByLabelText("submit-button");
const validURL = "https://test.com";

describe("UrlForm", () => {
  let mockFormAction: jest.Mock;

  beforeEach(() => {
    mockFormAction = jest.fn();
    mockUseActionState.mockReturnValue([null, mockFormAction, false]);
  });

  it("renders the url placeholder", () => {
    render(<UrlForm />);

    const input = getUrlInput();

    expect(input).toBeInTheDocument();
  });

  it("disables the submit button while pending", () => {
    mockUseActionState.mockReturnValue([null, mockFormAction, true]); // pending = true

    render(<UrlForm />);
    const button = getSubmitButton();

    expect(button).toBeDisabled();
  });

  it("shows backend errors and clears them when the user edits the input", async () => {
    mockUseActionState.mockReturnValue([{ errors: "Invalid URL" }, mockFormAction, false]);
    const user = userEvent.setup();
    render(<UrlForm />);

    const errorMessage = screen.getByText("Invalid URL");
    const button = getSubmitButton();

    expect(errorMessage).toBeInTheDocument();
    expect(button).toBeDisabled();

    const urlInput = getUrlInput();

    await user.type(urlInput, validURL);

    expect(errorMessage).not.toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it("calls formAction when submit button is clicked", async () => {
    const user = userEvent.setup();

    render(<UrlForm />);

    const input = getUrlInput();
    const button = getSubmitButton();

    await user.type(input, validURL);
    await user.click(button);

    expect(mockFormAction).toHaveBeenCalledTimes(1);
  });
});
