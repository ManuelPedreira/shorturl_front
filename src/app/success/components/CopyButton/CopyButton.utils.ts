export const copyToClipboard = (
  text: string,
  options: {
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }
) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(options.onSuccess).catch(options.onError);
  } else {
    fallbackCopyTextToClipboard(text, options);
  }
};

const fallbackCopyTextToClipboard = (
  text: string,
  options: {
    onSuccess?: () => void;
    onError?: (err: unknown) => void;
  }
) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    if (successful) {
      options.onSuccess?.();
    } else {
      options.onError?.(new Error("Fallback copy error"));
    }
  } catch (err) {
    options.onError?.(err);
  } finally {
    document.body.removeChild(textArea);
  }
};
