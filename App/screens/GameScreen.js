import React, { useState } from "react";
import { StyleSheet, Image, View, Picker } from "react-native";

import style from "../config/styles";
import colors from "../config/colors";
import json from "../assets/json/language.json";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { randomWord } from "../components/Words";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppIconView from "../components/AppIconView";
import AppModal from "../components/AppModal";

const images = [
  require("../assets/hangman_states/state0.png"),
  require("../assets/hangman_states/state1.png"),
  require("../assets/hangman_states/state2.png"),
  require("../assets/hangman_states/state3.png"),
  require("../assets/hangman_states/state4.png"),
  require("../assets/hangman_states/state5.png"),
  require("../assets/hangman_states/state6.png"),
  require("../assets/hangman_states/state7.png"),
];

const word = randomWord();

function GameScreen(props) {
  // new Array(...guessedWords).join("")
  const [language, setLanguage] = useState("english");
  const maxWrong = 7;
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guess, setGuess] = useState("");
  const [completedWord, setCompletedWord] = useState(" " * word.length);
  const [guessedWords, setGuessedWords] = useState(new Set());

  const [modalVisible, setModalVisible] = useState(true);

  const handleOnPress = () => {
    checkIfCorrect(guess);
  };

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }
  const checkIfCorrect = (g) => {
    //if (isLetter(g)) {
    console.log(word);
    guessedWords.add("c");
    if (word.includes(g) && !guessedWords.has(g)) {
      guessedWords.add(g);
      console.log("correct letter");
    } else if (!word.includes(g) && !guessedWords.has(g)) {
      setWrongGuesses(wrongGuesses + 1);
      guessedWords.add(g);
      console.log("wrong guess, wrong guesses: " + wrongGuesses);
      if (wrongGuesses === 7) {
        console.log("finished");
      }
    }
    console.log(new Array(...guessedWords).join(""));
    //}
  };

  return (
    <Screen style={styles.container}>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modelInfo={json[language].information}
        modelButtonTitle={json[language].modelButtonClose}
      />
      <View style={styles.headerContainer}>
        <AppText>{json[language].titleGame}</AppText>
        <View style={styles.iconContainer}>
          <AppIconView icon="info" onPress={() => setModalVisible(true)} />
          <Picker
            selectedValue={language}
            style={{ height: 50, width: 120 }}
            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
          >
            <Picker.Item label="English" value="english" />
            <Picker.Item label="norsk" value="norsk" />
          </Picker>
        </View>
      </View>
      <View style={styles.outputContainer}>
        <AppText>{json[language].guessed}</AppText>
        <AppText>{"wrong : " + wrongGuesses}</AppText>
      </View>
      <AppText>{word}</AppText>
      <Image style={styles.image} source={images[wrongGuesses]}></Image>
      <AppTextInput
        placeholder={json[language].possibleInputs}
        icon="add"
        onChangeText={(text) => setGuess(text)}
      />
      <AppButton title="Click" onPress={() => handleOnPress()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "dodgerblue",
    flexDirection: "row",
  },
  image: {
    width: "70%",
    height: 300,
    resizeMode: "contain",
  },
  outputContainer: {
    flexDirection: "row",
    backgroundColor: "orange",
    width: "100%",
    height: 100,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
export default GameScreen;
