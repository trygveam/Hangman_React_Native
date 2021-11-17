import React from "react";
import { ImageBackground, Button, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";

import style from "../config/styles";
import colors from "../config/colors";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
function WelcomeScreen({ route, navigation }) {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.header}>Welcome</AppText>
      <AppText style={styles.information}>
        This is a long text explaining the rules and shit aboyt this game, This
        is a long text explaining the rules and shit aboyt this game , This is a
        long text explaining the rules and shit aboyt this game, This is a long
        text explaining the rules and shit aboyt this game , This is a long text
        explaining the rules and shit aboyt this game, This is a long text
        explaining the rules and shit aboyt this game
      </AppText>
      <AppButton
        style={styles.startButton}
        onPress={() => navigation.goBack()}
        title="Start Game"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 100,
    color: colors.white,
  },
  information: {
    color: colors.white,
  },
  startButton: {
    position: "absolute",
    bottom: 30,
  },
});

export default WelcomeScreen;
