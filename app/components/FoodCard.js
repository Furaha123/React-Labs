import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const FoodCard = ({ food, handleSelect }) => (
  <TouchableOpacity onPress={() => handleSelect(food)}>
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{food.title}</Text>
        <Text style={styles.description}>{food.description}</Text>
      </View>

      <View></View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    margin: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",

    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#555555",
    textAlign: "center",
  },
});

export default FoodCard;
