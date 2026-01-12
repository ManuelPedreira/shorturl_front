import { cookies } from "next/headers";
import styles from "./page.module.scss";
import { Suspense } from "react";
import UrlDetails from "./components/UrlDetails/UrlDetails";
import Link from "next/link";
import CopyButton from "./components/CopyButton/CopyButton";
import { getTranslations } from "next-intl/server";

export default async function SuccessPage() {
  const t = await getTranslations("SuccessPage");
  const cookieStore = await cookies();
  const data = cookieStore.get("shortUrlData");
  const parsed = data ? JSON.parse(data.value) : null;

  const shortUrl = parsed.shortUrl;
  const originalUrl = parsed?.originalUrl;
  const shortCode = parsed?.shortCode;

  return (
    <div className={styles.container}>
      <h1>{t("title")}</h1>
      <div className={styles.card}>
        <div className={styles.url_container}>
          <div className={styles.label}>
            {t("short_url_title")}
            <CopyButton value={shortUrl} />
          </div>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>

        <Suspense>{shortCode ? <UrlDetails urlCode={shortCode} /> : null}</Suspense>
        <div className={styles.original_url}>
          {`${t("original_url_title")}: `}
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {originalUrl}
          </a>
        </div>
      </div>
      <Link href={"/"} className={styles.button_link} aria-label="go-back-link">
        <button className={styles.button}>{t("back_button")}</button>
      </Link>
    </div>
  );
}
