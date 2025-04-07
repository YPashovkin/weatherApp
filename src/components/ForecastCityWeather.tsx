import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../context/ThemeContext";
import { ForecastCityWeatherProps } from "../../api/queries/useCityWeatherQueryData";
import { getFontSize } from "../utils/fontResponsiveness";

export const ForecastCityWeather = ({ forecast }: ForecastCityWeatherProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {forecast?.forecastday?.map((days, index) => {
          const date = new Date(days?.date);
          const dayName = date.toLocaleDateString("ru", { weekday: "long" });

          return (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 100}
              duration={500}
              key={index}
              style={[
                styles.forecastCard,
                { backgroundColor: theme.colors.card },
              ]}
              accessibilityLabel={`Прогноз на ${dayName}, ${days?.day?.maxtemp_c} градусов, ${days.day.condition.text}`}
              accessibilityRole="summary"
            >
              <Image
                source={{ uri: `https:${days.day.condition.icon}` }}
                style={styles.forecastImage}
                resizeMode="contain"
              />
              <Text style={[styles.dayNameText, { color: theme.colors.text }]}>
                {dayName}
              </Text>
              <Text style={[styles.avgTempText, { color: theme.colors.text }]}>
                {`${days?.day?.maxtemp_c && Math.round(days.day.maxtemp_c)} °C`}
              </Text>
            </Animatable.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  forecastCard: {
    minWidth: 96,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  forecastImage: {
    width: 48,
    height: 48,
    marginBottom: 4,
  },
  dayNameText: {
    fontSize: getFontSize(12),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 2,
  },
  avgTempText: {
    fontSize: getFontSize(16),
    fontWeight: "600",
    textAlign: "center",
  },
});
