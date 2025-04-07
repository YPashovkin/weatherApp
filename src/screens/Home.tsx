import { StyleSheet, View } from "react-native";
import { CityInput } from "../components/CityInput";


export function Home() {
  return (
    <View style={styles.container}>
      <CityInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 10,
    marginHorizontal: 8,
  },
});
