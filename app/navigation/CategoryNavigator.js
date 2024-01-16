import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import FoodList from "../screen/FoodList";
import AddFood from "../screen/AddFood";

const CategoryNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          title: "Personal Manageme",
        }}
        name="FoodList"
        component={FoodList}
      />
      <Stack.Screen name="AddCategory" component={HomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEvent" component={AddFood} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;

const styles = StyleSheet.create({});
