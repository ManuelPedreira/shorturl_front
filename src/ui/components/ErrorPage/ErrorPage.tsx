import Link from "next/link";
import styles from "./ErrorPage.module.scss";

const ErrorPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something when wrong!</h1>
      <div className={styles.message}>{children}</div>
      <button className={styles.button}>
        <Link href={"/"}>Go Back</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
