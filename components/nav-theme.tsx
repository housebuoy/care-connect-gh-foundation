"use client";

import { createContext, useContext, useState, useEffect } from "react";

type NavTheme = "light" | "ink";
const NavThemeContext = createContext<{
  theme: NavTheme;
  setTheme: (t: NavTheme) => void;
}>({ theme: "ink", setTheme: () => {} });

export function NavThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<NavTheme>("ink");
  return (
    <NavThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </NavThemeContext.Provider>
  );
}

export function useNavTheme() {
  return useContext(NavThemeContext);
}

// pages drop this in to declare their hero is dark; resets on unmount
export function NavTheme({ theme }: { theme: NavTheme }) {
  const { setTheme } = useNavTheme();
  useEffect(() => {
    setTheme(theme);
    return () => setTheme("ink"); // default back to ink when leaving the page
  }, [theme, setTheme]);
  return null;
}