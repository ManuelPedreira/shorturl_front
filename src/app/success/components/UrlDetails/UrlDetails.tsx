"use client";

import { useUrlUpdates } from "@/hooks/useUrlUpdates";
import styles from "./UrlDetails.module.scss";

const UrlDetails = ({ urlCode }: { urlCode: string }) => {
  const { message } = useUrlUpdates(urlCode);

  if (!message) return null;

  return (
    <div className={styles.details}>
      {message?.imageUrl && (
        <img className={styles.thumbnail} src={message.imageUrl} alt="preview" />
      )}

      <div className={styles.info}>
        <h2 className={styles.title}>{message.title}</h2>
        <p className={styles.description}>{message.description}</p>
      </div>
    </div>
  );
};

export default UrlDetails;
