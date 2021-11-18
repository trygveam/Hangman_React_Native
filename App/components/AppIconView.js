import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function AppIconView({ icon, onPress }) {
  return (
    <TouchableOpacity>
      <MaterialIcons
        name={icon}
        size={40}
        color={colors.black}
        onPress={onPress}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default AppIconView;
