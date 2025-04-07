import { Button, Text } from "@react-navigation/elements";
import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useCityWeatherQueryData } from "../../api/queries/useCityWeatherQueryData";
import { CityWeatherDetails } from "../components/CityWeatherDetails";
import { ForecastCityWeather } from "../components/ForecastCityWeather";
import { useTheme } from "../context/ThemeContext";
import * as Animatable from "react-native-animatable";

type Props = StaticScreenProps<{
  city: string;
}>;

export function CityWeather({ route }: Props) {
  const { data, error, isLoading } = useCityWeatherQueryData(route.params.city);
  const navigation = useNavigation();
  const { theme } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.city,
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.colors.background }]}>
        <Animatable.Text
          animation="fadeInDown"
          style={[styles.errorText, { color: theme.colors.text }]}
        >
          {error.response?.data?.error?.message ||
            "Что-то пошло не так, попробуйте позже"}
        </Animatable.Text>

        <Button screen="HomeTabs">На главнуую</Button>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CityWeatherDetails location={data?.location} current={data?.current} />
      <ForecastCityWeather forecast={data?.forecast} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "semibold",
    paddingBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
