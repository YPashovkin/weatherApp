import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { lightTheme, darkTheme, CustomTheme } from "../../theme";
import { Appearance } from "react-native";
import { storage } from "../storage/MMKV";

interface ThemeContextProps {
  theme: CustomTheme;
  setThemeMode: (mode: "dark" | "light") => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeModeStorage = storage.getString("settings.themeMode");

  const [isDarkMode, setIsDarkMode] = useState(themeModeStorage ?? 'light');
  const setThemeMode = (mode: "dark" | "light") => setIsDarkMode(mode);

  useEffect(() => {
    if(!themeModeStorage) {
      storage.set("settings.themeMode", isDarkMode);
    }}, [])

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme ?? 'light');
    });

    // Cleanup the listener when component unmounts
    return () => listener.remove();
  }, []);

  const theme = useMemo(
    () => (isDarkMode === "dark" ? darkTheme : lightTheme),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
