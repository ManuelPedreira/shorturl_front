import UrlForm from "./components/UrlForm/UrlForm";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 aria-label="title">Short URL</h1>
      <UrlForm />
    </div>
  );
}
