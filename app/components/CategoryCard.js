import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategoryCard = ({ category, handleDeleteCategory, handleSelect }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FoodList", {
          category: category,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>{category.icon}</View>
        <Text style={styles.title}>{category.title}</Text>
        <Text style={styles.description}>{category.description}</Text>
        {/* Update icon */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "70%",
            paddingTop: 20,
          }}
        >
          <MaterialCommunityIcons
            onPress={() => {
              handleSelect(category);
            }}
            name={
              Platform.OS === "android" ? "update" : "update-circle-outline"
            }
            size={30}
            color={"green"}
          />
          {/* Delete icon */}
          <MaterialCommunityIcons
            onPress={() => {
              Alert.alert(
                "Delete Category",
                "Are you sure you want to delete?",
                [
                  {
                    text: "Yes",
                    onPress: () => handleDeleteCategory(category.id),
                  },
                  {
                    text: "No",
                  },
                ]
              );
            }}
            name={
              Platform.OS === "android" ? "delete" : "delete-circle-outline"
            }
            size={30}
            color={"red"}
          />
          {/* View Food for category icon */}
          {/* <MaterialCommunityIcons
            onPress={() => console.log("View Food")}
            name={Platform.OS === "android" ? "food" : "food"}
            size={30}
            color={"blue"}
          /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
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

export default CategoryCard;
