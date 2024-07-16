"use client";
import { createContext, useEffect, useState } from "react";

type Theme = "light" | "moon" | "dark";

interface DarkModeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const darkModeContext = createContext<DarkModeContextType>({
  theme: "moon",
  setTheme: () => null,
});

const DarkModeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isSystemDark ? "dark" : "light");
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <darkModeContext.Provider value={{ theme, setTheme }}>{children}</darkModeContext.Provider>;
};

export default DarkModeContextProvider;
