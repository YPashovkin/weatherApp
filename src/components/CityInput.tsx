import { StyleSheet, TextInput, View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { SearchIcon } from "../assets/icons";
import { inputTextValidation } from "../utils/validation";
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';
import { getFontSize } from "../utils/fontResponsiveness";
import { useNavigation } from "@react-navigation/native";

export const CityInput = () => {
  const [inputText, setInputText] = useState("");
  const { theme } = useTheme();
  const navigation = useNavigation();

  const isInputTextCorrect = inputTextValidation.isCorrect(inputText);

  const handleInputTextChange = (text: string) => {
    if (inputTextValidation.isCorrect(text) || text === "") {
      setInputText(text);
    } else {
      Toast.show({
        type: "error",
        text1: "Валидация ввода",
        text2: "Название города должно содержать только буквы",
      });
    }
  };

  const handleSubmit = () => {
    if (isInputTextCorrect) {
      navigation.navigate("CityWeather", { city: inputText });
    }
  };

  return (
    <>
      <Animatable.View
        key={theme.dark ? "dark" : "light"}
        animation="fadeInDown"
        duration={600}
        style={[styles.inputContainer, { backgroundColor: theme.colors.card }]}
      >
        <View style={styles.iconContainer}>
          <SearchIcon stroke={theme.colors.text} testID="search-icon" />
        </View>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
            },
          ]}
          value={inputText}
          placeholder={"Введите город"}
          placeholderTextColor={`${theme.colors.text}`}
          maxLength={168}
          selectionColor={theme.colors.primary || "#007AFF"}
          testID="search-input-home"
          onChangeText={handleInputTextChange}
          autoCorrect={false}
          autoCapitalize={"words"}
          inputMode="search"
          keyboardType="default"
          accessibilityLabel="Поле ввода города"
          accessibilityRole="search"
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={200}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isInputTextCorrect ? theme.colors.primary : "#ccc",
            },
          ]}
          onPress={handleSubmit}
          disabled={!isInputTextCorrect}
          accessibilityRole="button"
          accessibilityLabel="Найти городскую погоду"
        >
          <Text style={styles.buttonText}>Найти</Text>
        </TouchableOpacity>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    height: 48,
    marginBottom: 12,
  },
  iconContainer: {
    paddingLeft: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: getFontSize(16),
    height: 48,
    borderRadius: 8,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: getFontSize(16),
  },
});
