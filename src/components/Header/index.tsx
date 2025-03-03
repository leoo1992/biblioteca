import { BiBook } from "react-icons/bi";
import { BsFileEarmarkPerson } from "react-icons/bs";
import styles from "./Header.module.css";
import { NavLink } from "react-router";

export default function Index() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.activeLink}` : `${styles.inactiveLink}`
          }
        >
          <BiBook /> Livros
        </NavLink>
        <NavLink
          to="/authors"
          className={({ isActive }) =>
            isActive ? `${styles.activeLink}` : `${styles.inactiveLink}`
          }
        >
          <BsFileEarmarkPerson />
          Autores
        </NavLink>
      </nav>
    </header>
  );
}
