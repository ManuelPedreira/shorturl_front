import styles from "./LoadingContainer.module.scss";

const LoadingContainer = () => {
  return (
    <div className={styles.container}>
      <span className={styles.spinner} />
    </div>
  );
};

export default LoadingContainer;
