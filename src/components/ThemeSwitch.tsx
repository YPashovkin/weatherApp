import React from "react";
import { StyleSheet, Switch, Pressable, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../context/ThemeContext";
import { useMMKVString } from "react-native-mmkv";
import { Text } from "@react-navigation/elements";
import { getFontSize } from "../utils/fontResponsiveness";

export function ThemeSwitch() {
  const { theme, setThemeMode } = useTheme();
  const [themeMode, setValue] = useMMKVString("settings.themeMode");

  const isLight = themeMode === "light";  

  const toggleSwitch = () => {
    const nextMode = isLight ? "dark" : "light";
    setValue(nextMode);
    setThemeMode(nextMode);
  };  

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      style={[
        styles.container,
        { borderColor: theme.colors.border },
      ]}
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Тема оформления
      </Text>

      <Pressable
        style={styles.switchRow}
        onPress={toggleSwitch}
        accessibilityRole="switch"
        accessibilityLabel={`Переключить тему. Сейчас: ${isLight ? "светлая" : "тёмная"}`}
        accessibilityState={{ checked: isLight }}
      >
        <Text style={[styles.modeText, { color: theme.colors.text }]}>
          Тёмная
        </Text>

        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={themeMode === "light" ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={themeMode === "light"}
      />

        <Text style={[styles.modeText, { color: theme.colors.text}]}>
          Светлая
        </Text>
      </Pressable>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
  },
  label: {
    fontSize: getFontSize(16),
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeText: {
    fontSize: getFontSize(14),
    fontWeight: "500",
    paddingHorizontal: 8,
  },
});
