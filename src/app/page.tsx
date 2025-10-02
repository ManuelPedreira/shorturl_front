import createNewUrl from "./actions/createNewUrl";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Short URL</h1>
        <form action={createNewUrl} className={styles.input_container}>
          <input className={styles.input} name="url" placeholder="http://" required />
          <button className={styles.button} type="submit">
            Shorten!
          </button>
        </form>
      </div>
    </main>
  );
}
