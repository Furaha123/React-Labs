import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ReusableModal = ({ isModalVisible, toggleModal, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              position: "absolute",
              right: 10,
              top: 5,
            }}
          >
            <MaterialCommunityIcons
              onPress={toggleModal}
              name={
                Platform.OS === "android" ? "close" : "close-circle-outline"
              }
              size={30}
              color={"red"}
            />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ReusableModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    gap: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
