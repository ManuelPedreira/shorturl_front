import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CopyButton from "../CopyButton";
import { copyToClipboard } from "../CopyButton.utils";

jest.mock("../CopyButton.utils", () => ({
  copyToClipboard: jest.fn(),
}));

describe("CopyButton", () => {
  const mockCopyToClipboard = copyToClipboard as jest.MockedFunction<typeof copyToClipboard>;

  it("should render initial state", () => {
    render(<CopyButton value="www.example.com" />);

    const initialStateButton = screen.getByLabelText("copy-content");
    const clipboardIcon = screen.getByLabelText("clipboard");

    expect(initialStateButton).toBeInTheDocument();
    expect(clipboardIcon).toBeInTheDocument();
  });

  it("should call copyToClipboard on click clipboard", async () => {
    const user = userEvent.setup();
    render(<CopyButton value="www.example.com" />);

    const button = screen.getByLabelText("copy-content");
    await user.click(button);

    expect(mockCopyToClipboard).toHaveBeenCalled();
  });

  it("should show success icon after copy", async () => {
    const user = userEvent.setup();
    render(<CopyButton value="www.example.com" />);
    mockCopyToClipboard.mockImplementationOnce((value, { onSuccess }) => {
      onSuccess?.();
    });

    const button = screen.getByLabelText("copy-content");
    await user.click(button);
    const successStateButton = screen.getByLabelText("content-copied-successfully");
    const clipboardCheckIcon = screen.getByLabelText("clipboard-check");

    expect(successStateButton).toBeInTheDocument();
    expect(clipboardCheckIcon).toBeInTheDocument();
  });
});
