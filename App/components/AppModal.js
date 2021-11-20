import React from "react";
import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
function AppModal({
  modalVisible,
  setModalVisible,
  modelInfo,
  modelButtonTitle,
  onPress,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AppText style={styles.modalText}>{modelInfo}</AppText>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onPress}
          >
            <AppText style={styles.textStyle}>{modelButtonTitle}</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default AppModal;
