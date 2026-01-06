import { createContext, useContext, useState, type ReactNode } from "react";
import type { THEME } from "../type";

const themeContext = createContext<{ theme: THEME; toggleTheme: () => void }>({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<THEME>(() => {
    const saved = localStorage.getItem("theme");
    return saved ? (saved as THEME) : 'light';
    
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      let currentTheme:THEME;

      if (prev === "light") {
        currentTheme = "dark";
      } else {
        currentTheme = "light";
      }
       
       document.documentElement.setAttribute("data-theme", currentTheme);
      localStorage.setItem("theme", currentTheme);

      return currentTheme;
    });
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export const useTheme = () => useContext(themeContext);
