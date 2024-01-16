import { View, Text } from "react-native";
import React from "react";
import AppText from "../AppText";
import { colors } from "../../config/color";

const AppButton = ({ title, ...others }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: colors.tomato,
        borderRadius: 10,
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
      }}
    >
      <AppText value={title} size={15} {...others} color="white" bold={false} />
    </View>
  );
};

export default AppButton;
