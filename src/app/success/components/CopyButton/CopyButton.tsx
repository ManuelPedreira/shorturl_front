"use client";

import { useState } from "react";
import styles from "./CopyButton.module.scss";
import Clipboard from "@/assets/clipboard.svg";
import ClipboardCheck from "@/assets/clipboard_check.svg";
import { copyToClipboard } from "./CopyButton.utils";

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(value, {
      onSuccess: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      onError(err) {
        console.error(err);
      },
    });
  };

  return (
    <button
      className={styles.button}
      onClick={handleCopy}
      aria-label={copied ? "content-copied-successfully" : "copy-content"}
    >
      {copied ? (
        <ClipboardCheck width="20px" height="20px"  aria-label="clipboard-check"/>
      ) : (
        <Clipboard width="20px" height="20px" aria-label="clipboard" />
      )}
    </button>
  );
};

export default CopyButton;
