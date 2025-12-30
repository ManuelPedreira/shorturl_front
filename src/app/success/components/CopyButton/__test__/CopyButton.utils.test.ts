import { copyToClipboard } from "../CopyButton.utils";

const copyText = "test text to copy";

describe("copyToClipboard", () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    jest.clearAllMocks();
    // mock de clipboard.writeText
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(undefined),
    };
  });

  afterAll(() => {
    // restaurar clipboard original
    global.navigator.clipboard = originalClipboard;
  });

  it("copies text to clipboard and calls onSuccess", async () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    await copyToClipboard(copyText, { onSuccess, onError });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyText);
    expect(onSuccess).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls onError if clipboard.writeText rejects", async () => {
    const error = new Error("Failed");
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(error);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    copyToClipboard(copyText, { onSuccess, onError });

    // Waiting for writeText promisse being resolved
    await new Promise(process.nextTick);

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(error);
  });
});
