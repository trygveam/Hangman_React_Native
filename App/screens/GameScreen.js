import React, { useState } from "react";
import { StyleSheet, Image, Button } from "react-native";
import AppText from "../components/AppText";
import style from "../config/styles";
import Screen from "../components/Screen";
import { randomWord } from "../components/Words";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";

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

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
const word = randomWord();

function GameScreen(props) {
  const maxWrong = 7;
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guess, setGuess] = useState("");
  const guessedWords = new Set();
  const [completedWord, setCompletedWord] = useState(" " * word.length);

  const handleOnPress = () => {
    checkIfCorrect(guess);
  };

  const checkIfCorrect = (g) => {
    console.log("letter" + isLetter(g));
    console.log("word includes " + word.includes(g));
    console.log("guessed includes " + guessedWords.has(g));
    if (isLetter(g)) {
      if (word.includes(g) && !guessedWords.has(g)) {
        console.log("correct letter");
      } else {
        setWrongGuesses(wrongGuesses + 1);
        if (wrongGuesses == 7) {
          console.log("finished");
        }
      }
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText>Game Screen</AppText>
      <AppText>{word}</AppText>
      <Image source={images[wrongGuesses]}></Image>
      <AppTextInput
        placeholder="guess"
        icon="email"
        onChangeText={(text) => setGuess(text)}
      />
      <Button title="Click to Update" onPress={() => handleOnPress()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
export default GameScreen;
