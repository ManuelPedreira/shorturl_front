import UrlForm from "./components/UrlInput/UrlForm";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Short URL</h1>
      <UrlForm />
    </div>
  );
}
