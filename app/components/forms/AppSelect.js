import { View, Text, StyleSheet } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";

const AppSelect = ({ items, ...other }) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        buttonStyle={styles.dropdown2BtnStyle}
        buttonTextStyle={styles.dropdown2BtnTxtStyle}
        dropdownIconPosition={"right"}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        renderDropdownIcon={(isOpened) => {
          return (
            <Entypo
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#444"}
              size={20}
            />
          );
        }}
        data={items}
        {...other}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fff0",
    padding: 10,
    gap: 10,
    borderRadius: 20,
  },
  dropdown2BtnStyle: {
    width: "100%",
    height: 35,
    backgroundColor: "#f0fff0",
    borderRadius: 8,
    textAlign: "left",
    // borderWidth: 1,
    // borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default AppSelect;
