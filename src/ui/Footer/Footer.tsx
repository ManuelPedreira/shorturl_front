import Link from "next/link";
import styles from "./Footer.module.scss";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          {t.rich("developed_by", {
            author: (author) => (
              <Link
                href="https://github.com/ManuelPedreira"
                target="_blank"
                rel="noopener noreferrer"
              >
                {author}
              </Link>
            ),
          })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
