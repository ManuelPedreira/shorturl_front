"use client";

import { useState } from "react";
import styles from "./CopyButton.module.scss";
import Clipboard from "@/assets/clipboard.svg";
import ClipboardCheck from "@/assets/clipboard_check.svg";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const copyHandler = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          fallbackCopyTextToClipboard(value);
        });
    } else {
      fallbackCopyTextToClipboard(value);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
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
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        console.error("Fallback copy failed");
      }
    } catch (err) {
      console.error("Fallback copy error:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className={styles.button} onClick={copyHandler}>
      {copied ? (
        <ClipboardCheck width="20px" height="20px" />
      ) : (
        <Clipboard width="20px" height="20px" />
      )}
    </div>
  );
};

export default CopyButton;
