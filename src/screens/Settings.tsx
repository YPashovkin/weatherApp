import { StyleSheet, View } from "react-native";
import { ThemeSwitch } from "../components/ThemeSwitch";

export function Settings() {
  return (
    <View style={styles.container}>
      <ThemeSwitch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
