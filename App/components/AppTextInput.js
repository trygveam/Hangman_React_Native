import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={25}
          color={colors.white}
          style={styles.icon}
        />
      )}
      <TextInput maxLength={1} styles={defaultStyles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 25,
    flexDirection: "row",
    width: "50%",
    padding: 15,
    marginVertical: 10,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Avenir",
    color: colors.black,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
