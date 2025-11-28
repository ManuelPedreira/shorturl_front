import { render, screen } from "@testing-library/react";
import CopyButton from "../components/CopyButton/CopyButton";

jest.mock("@/assets/clipboard_check.svg", () => () => <div data-testid="clipboard-check-icon" />);
jest.mock("@/assets/clipboard.svg", () => () => <div data-testid="clipboard-icon" />);

describe("CopyButton", () => {
  it("should render clipboard icon initially", () => {
    render(<CopyButton value="www.example.com" />);
    expect(screen.getByTestId("clipboard-icon")).toBeInTheDocument();
  });
});
