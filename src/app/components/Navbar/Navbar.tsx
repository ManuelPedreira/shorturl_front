import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <h1>logo</h1>
        <nav>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
