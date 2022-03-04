import { createContext } from "react";

export const themes = {
  dark: "",
  light: "light-theme",
};

export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: () => { },
});