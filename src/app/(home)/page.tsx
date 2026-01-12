import { getTranslations } from "next-intl/server";
import UrlForm from "./components/UrlForm/UrlForm";
import styles from "./page.module.scss";

export default async function Home() {
  const t = await getTranslations("Home");

  return (
    <div className={styles.container}>
      <h1 aria-label="title">{t("title")}</h1>
      <UrlForm submitText={t("submit_button")}/>
    </div>
  );
}
