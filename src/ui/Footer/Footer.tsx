import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>Developed by <Link target="_blank" href={"https://github.com/ManuelPedreira"}>      
          Manuel Pedreira
          </Link>
          </p>
      </div>
    </footer>
  );
};

export default Footer;
