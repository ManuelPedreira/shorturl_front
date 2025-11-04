import Link from "next/link";
import styles from "./Navbar.module.scss";
import { NavigationElementType } from "@/lib/pageConfig";
import LogoSVG from "@/ui/svg/LogoSVG/LogoSVG";
import GithubSVG from "@/ui/svg/GithubSVG/GithubSVG";

type NavbarPropsType = {
  elements: NavigationElementType[];
};

const Navbar = ({ elements }: NavbarPropsType) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href={"/"}>
          <LogoSVG />
        </Link>
        <nav>
          <ul>
            {elements.map((pageLink) => (
              <li key={pageLink.text}>
                {pageLink.url ? <Link href={pageLink.url}>{pageLink.text}</Link> : pageLink.text}
              </li>
            ))}
            <li>
              <Link target="_blank" href={"https://github.com/ManuelPedreira"}>
                <GithubSVG />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
