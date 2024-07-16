"use client";
import Link from "next/link";
import { useContext } from "react";

import { THEME_LIST } from "@/constant";
import { darkModeContext } from "@/context/DarkModeContext";
import { cn } from "@/utils/className";

import styles from "./index.module.scss";

const Header = () => {
  const { theme, setTheme } = useContext(darkModeContext);
  return (
    <header className={styles.container}>
      <div className={styles.upperBox}>
        <Link className={styles.logo} href="/">
          zoonyoung
        </Link>
        <small className={styles.small}>devlog</small>
        <ul className={styles.themeBox}>
          {THEME_LIST.map(th => (
            <li className={cn(styles.theme, theme === th && styles.selection)} key={th} onClick={() => setTheme(th)}>
              {th}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottomBox}>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </div>
    </header>
  );
};
export default Header;
