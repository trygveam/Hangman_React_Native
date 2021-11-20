import React, { useState } from "react";
import { StyleSheet, Image, View, Alert, DevSettings } from "react-native";

import style from "../config/styles";
import colors from "../config/colors";
import json from "../assets/json/language.json";
import { Picker } from "@react-native-picker/picker";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { randomWord } from "../components/Words";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import AppIconView from "../components/AppIconView";
import AppModal from "../components/AppModal";
import { useNavigationBuilder } from "@react-navigation/core";
import { useLinkTo } from "@react-navigation/native";

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
const wordArray = Array.from(word);
const cwArray = Array(word.length).fill("-");

function GameScreen(props) {
  const [wordState, setWordState] = useState(word);
  const [language, setLanguage] = useState("english");
  const [modalVisible, setModalVisible] = useState(true);
  const [modalFinishVisible, setModalFinishVisible] = useState(false);
  const [guess, setGuess] = useState("");
  const [guessedLettersString, setGuessedLettersString] = useState("");
  const [guessedCompleteString, setGuessedCompleteString] = useState(
    "-".repeat(word.length)
  );
  const [wgCount, setWGCount] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [won, setWon] = useState("");

  const handleOnPress = () => {
    checkIfCorrect(guess);
  };

  function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
  }

  const checkIfCorrect = (g) => {
    if (isLetter(g)) {
      console.log(wordArray);
      console.log(cwArray);
      if (wordState.includes(g) && !guessedLetters.has(g)) {
        guessedLetters.add(g);
        console.log(g);
        console.log(wordArray);
        console.log(wordArray.indexOf(g));
        console.log("correct letter");
        for (let i = 0; i < wordArray.length; i++) {
          if (wordArray[i] == g) {
            cwArray[i] = g;
          }
        }
        if (!cwArray.includes("-")) {
          console.log("game won");
          setWon(json[language].won);
          setModalFinishVisible(true);
        }
      } else if (!wordState.includes(g) && !guessedLetters.has(g)) {
        setWGCount(wgCount + 1);
        guessedLetters.add(g);
        console.log("wrong guess, wrong guesses: " + wgCount);
        if (wgCount == 6) {
          console.log("game lost");
          setWon(json[language].lost);
          setModalFinishVisible(true);
        }
      }
      console.log(wordArray);
      console.log(cwArray);
      setGuessedLettersString([...guessedLetters].join(" "));
      setGuessedCompleteString([...cwArray].join(" "));
    } else {
      Alert.alert(json[language].notLetterText);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modelInfo={json[language].information}
        modelButtonTitle={json[language].modelButtonClose}
        onPress={() => setModalVisible(!modalVisible)}
      />
      <AppModal
        modalVisible={modalFinishVisible}
        setModalVisible={setModalFinishVisible}
        modelInfo={won}
        modelButtonTitle={json[language].restart}
        onPress={() => DevSettings.reload()}
      />
      <View style={styles.headerContainer}>
        <AppText style={{ fontSize: 24 }}>{json[language].titleGame}</AppText>
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
        <AppText style={{ fontSize: 17 }}>
          {json[language].guessed + " : " + guessedLettersString}
        </AppText>
        <AppText style={{ fontSize: 17 }}>
          {json[language].countWrong + wgCount}
        </AppText>
      </View>
      <AppText>{wordState}</AppText>
      <Image style={styles.image} source={images[wgCount]}></Image>
      <AppText style={styles.wordComplete}>{guessedCompleteString}</AppText>
      <AppTextInput
        placeholder={json[language].possibleInputs}
        icon="add"
        onChangeText={(text) => setGuess(text.toLowerCase())}
      />
      <AppButton
        title={json[language].buttonInformation}
        onPress={() => handleOnPress()}
      />
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
    flexDirection: "row",
  },
  image: {
    width: "70%",
    height: 300,
    resizeMode: "contain",
  },
  outputContainer: {
    flexDirection: "column",
    width: "100%",
    height: 100,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  wordComplete: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
  },
});
export default GameScreen;
