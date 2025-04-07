import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CityWeather } from "../screens/CityWeather";
import { Settings } from "../screens/Settings";
import { NotFound } from "../screens/NotFound";
import { LocationIcon, SettingsIcon } from "../assets/icons";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => <LocationIcon fill={color} />,
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => <SettingsIcon fill={color} />,
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    CityWeather: {
      screen: CityWeather,
      linking: {
        path: ":city(@[a-zA-Z0-9-_]+)",
        parse: {
          city: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          city: (value) => `@${value}`,
        },
      },
      options: {
        headerBackTitle: 'Вернуться',
      }
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
