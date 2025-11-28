import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UrlForm from "../components/UrlInput/UrlForm";
import React from "react";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

const mockUseActionState = React.useActionState as jest.MockedFunction<typeof React.useActionState>;

describe("UrlForm", () => {
  let mockFormAction: jest.Mock;

  beforeEach(() => {
    mockFormAction = jest.fn();
    mockUseActionState.mockReturnValue([null, mockFormAction, false]);
  });

  it("renders the url placeholder", () => {
    render(<UrlForm />);
    const placeholder = screen.getByPlaceholderText("http://");
    expect(placeholder).toBeInTheDocument();
  });

  it("disables the submit button while pending", () => {
    mockUseActionState.mockReturnValue([null, mockFormAction, true]); // pending = true
    render(<UrlForm />);
    expect(screen.getByRole("button", { name: /shorten!/i })).toBeDisabled();
  });

  it("shows backend errors and clears them when the user edits the input", async () => {
    mockUseActionState.mockReturnValue([{ errors: "Invalid URL" }, mockFormAction, false]);
    render(<UrlForm />);

    expect(await screen.findByText("Invalid URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /shorten!/i })).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("http://"), {
      target: { value: "https://test.com" },
    });

    await waitFor(() => expect(screen.queryByText("Invalid URL")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: /shorten!/i })).toBeEnabled();
  });

  it("calls formAction when submit button is clicked", () => {
    render(<UrlForm />);

    const input = screen.getByPlaceholderText("http://");
    const button = screen.getByRole("button", { name: /shorten!/i });

    fireEvent.change(input, { target: { value: "https://google.com" } });
    fireEvent.click(button);

    expect(mockFormAction).toHaveBeenCalledTimes(1);
  });
});
