import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../context/ThemeContext";
import { CityWeatherResponse } from "../../api/queries/useCityWeatherQueryData";
import { getFontSize } from "../utils/fontResponsiveness";

export const CityWeatherDetails = ({
  location,
  current,
}: CityWeatherResponse) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text
          style={[styles.locationText, { color: theme.colors.text }]}
          accessibilityRole="header"
          accessibilityLabel={`Город: ${location?.name}`}
        >
          {location?.name},
        </Text>
        <Text
          style={[styles.countryText, { color: theme.colors.text }]}
          accessibilityLabel={`Страна: ${location?.country}`}
        >
          {location?.country}
        </Text>
      </View>

      <Animatable.View
        animation="fadeIn"
        duration={1000}
        style={styles.imageRow}
      >
        <Image
          source={{ uri: `https:${current?.condition?.icon}` }}
          defaultSource={require("../assets/weather-placeholder.png")}
          style={styles.weatherImage}
          resizeMode="contain"
        />
      </Animatable.View>

      <View>
        <Text
          style={[styles.tempText, { color: theme.colors.text }]}
          accessibilityRole="header"
          accessibilityLabel={`Температура: ${current?.temp_c} градуса по Цельсию`}
        >
          {`${current?.temp_c && Math.round(current?.temp_c)} °C`}
        </Text>
        <Text
          style={[styles.conditionText, { color: theme.colors.text }]}
          accessibilityLabel={`Состояние погоды: ${current?.condition?.text}`}
        >
          {current?.condition?.text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontSize: getFontSize(24),
    fontWeight: "bold",
    marginRight: 8,
    textAlign: "center",
  },
  countryText: {
    fontSize: getFontSize(16),
    fontWeight: "600",
    textAlign: "center",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  weatherImage: {
    width: 64,
    height: 64,
  },
  tempText: {
    fontSize: getFontSize(48),
    fontWeight: "bold",
    textAlign: "center",
  },
  conditionText: {
    fontSize: getFontSize(18),
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 4,
  },
});
