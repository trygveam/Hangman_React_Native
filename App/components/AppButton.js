import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

function AppButton({ title, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "50%",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AppButton;
