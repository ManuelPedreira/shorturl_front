import Link from "next/link";
import styles from "./ErrorContainer.module.scss";

const ErrorContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something when wrong!</h1>
      <div className={styles.message}>{children}</div>
      <Link href={"/"} className={styles.link}>
        <button className={styles.button}>Go Back</button>
      </Link>
    </div>
  );
};

export default ErrorContainer;
