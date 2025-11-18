import Link from "next/link";
import styles from "./Navbar.module.scss";
import { NavigationElementType } from "@/lib/pageConfig";
import Logo from "@/assets/logo.svg";
import GithubLogo from "@/assets/github.svg";

type NavbarPropsType = {
  elements: NavigationElementType[];
};

const Navbar = ({ elements }: NavbarPropsType) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href={"/"}>
          <Logo with="50px" height="50px" />
        </Link>
        <nav>
          <ul>
            {elements.map((pageLink) => (
              <li key={pageLink.text}>
                {pageLink.url ? (
                  <Link href={pageLink.url} title="Not implemented yet!">
                    {pageLink.text}
                  </Link>
                ) : (
                  pageLink.text
                )}
              </li>
            ))}
            <li>
              <Link target="_blank" href={"https://github.com/ManuelPedreira"}>
                <GithubLogo with="35px" height="35px" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
