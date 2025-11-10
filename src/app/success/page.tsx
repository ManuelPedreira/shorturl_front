import { cookies } from "next/headers";
import styles from "./page.module.scss";
import { Suspense } from "react";
import UrlDetails from "./components/UrlDetails/UrlDetails";
import Link from "next/link";

export default async function SuccessPage() {
  const cookieStore = await cookies();
  const data = cookieStore.get("shortUrlData");
  const parsed = data ? JSON.parse(data.value) : null;
  const shortUrl = `${process.env.NEXT_PUBLIC_SERVER_HOST}/${parsed.shortCode}`

  return (
    <div className={styles.container}>
      <h1>Your Short URL</h1>
      <div className={styles.card}>
        <div className={styles.url_container}>
          <div>
            <p className={styles.label}>Original URL:</p>
            <a href={parsed.originalUrl} target="_blank" rel="noopener noreferrer">
              {parsed.originalUrl}
            </a>
          </div>

          <div>
            <p className={styles.label}>Your Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        </div>

        <Suspense>{parsed?.shortCode ? <UrlDetails urlCode={parsed.shortCode} /> : null}</Suspense>
      </div>
      <Link href={"/"} className={styles.link}>
        <button className={styles.button}>Shorten another</button>
      </Link>
    </div>
  );
}
