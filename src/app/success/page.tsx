import { cookies } from "next/headers";
import styles from "./page.module.scss";
import { Suspense } from "react";
import UrlDetails from "./components/UrlDetails/UrlDetails";

export default async function SuccessPage() {
  const cookieStore = await cookies();
  const data = cookieStore.get("shortUrlData");
  const parsed = data ? JSON.parse(data.value) : null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Your Short URL</h1>

        {parsed ? (
          <div className={styles.card}>
            <div>
              <p className={styles.label}>Original URL:</p>
              <a href={parsed.originalUrl} target="_blank" rel="noopener noreferrer">
                {parsed.originalUrl}
              </a>
            </div>

            <div>
              <p className={styles.label}>Short URL:</p>
              <a href={parsed.shortUrl} target="_blank" rel="noopener noreferrer">
                {parsed.shortUrl}
              </a>
            </div>

            <Suspense>
              {parsed?.shortCode ? <UrlDetails urlCode={parsed.shortCode} /> : null}
            </Suspense>
          </div>
        ) : (
          <p className={styles.noData}>No data found</p>
        )}
      </div>
    </main>
  );
}
