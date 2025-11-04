import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.spinner} />
    </div>
  );
};

export default LoadingPage;
