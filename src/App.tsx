import { Assets as NavigationAssets } from "@react-navigation/elements";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Navigation } from "./navigation";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from 'react-native-toast-message';
import { CityWeatherError } from "../api/queries/useCityWeatherQueryData";

Asset.loadAsync([
  ...NavigationAssets,
]);

if (__DEV__) {
  require('../ReactotronConfig');
}

SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: Error & CityWeatherError) =>      
      Toast.show({
        type: 'error',
        text1: `Error code: ${error?.response?.data?.error?.code ?? 'Unknown'}`,
        text2: error?.response?.data?.error?.message ?? 'Something went wrong, try again later',
      })
  }),
});

const RootLayout = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.card,
          paddingTop: insets.top,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Navigation
            linking={{
              enabled: "auto",
              prefixes: [
                // Change the scheme to match your app's scheme defined in app.json
                "helloworld://",
              ],
            }}
            onReady={() => {
              SplashScreen.hideAsync();
            }}
            theme={theme}
          />
        </QueryClientProvider>
      </View>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <Toast />
    </>
  );
};

export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayout />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
