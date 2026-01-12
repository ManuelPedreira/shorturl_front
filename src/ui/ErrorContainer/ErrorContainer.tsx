import Link from "next/link";
import styles from "./ErrorContainer.module.scss";

type ErrorContainerProps = {
  title: string;
  text: string;
  description: string;
  goBackButtonText: string;
};

const ErrorContainer = ({ title, text, description, goBackButtonText }: ErrorContainerProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.message}>
        <p>{text}</p>
        <small>{description}</small>
      </div>
      <Link href={"/"} className={styles.link} aria-label="go-back-link">
        <button className={styles.button} aria-label="go-back-button">
          {goBackButtonText}
        </button>
      </Link>
    </div>
  );
};

export default ErrorContainer;
