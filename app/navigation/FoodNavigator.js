import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFood from "../screen/AddFood";
import FoodList from "../screen/FoodList";

const FoodNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="FoodList">
      <Stack.Screen name="FoodList" component={FoodList} />
      <Stack.Screen name="AddFood" component={AddFood} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;

const styles = StyleSheet.create({
  
});
