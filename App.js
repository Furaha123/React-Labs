import React from "react";
import { View, Text, FlatList, Image, ScrollView } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import CategoryCard from "./app/components/CategoryCard";
import FoodCard from "./app/components/FoodCard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./app/screen/HomeScreen";
import FoodList from "./app/screen/FoodList";
import { NavigationContainer } from "@react-navigation/native";
import CategoryNavigator from "./app/navigation/CategoryNavigator";
import FoodNavigator from "./app/navigation/FoodNavigator";

const categories = [
  {
    id: "1",
    title: "Diabetes",
    description: "Manage your blood sugar levels",
    icon: <Ionicons name="md-medical" size={24} color="black" />,
  },
  {
    id: "2",
    title: "Hypertension",
    description: "Control high blood pressure",
    icon: <MaterialIcons name="healing" size={24} color="black" />,
  },
  {
    id: "3",
    title: "Heart Disease",
    description: "Heart-healthy diet",
    icon: <FontAwesome name="heartbeat" size={24} color="black" />,
  },
  {
    id: "4",
    title: "Gluten Intolerance",
    description: "Gluten-free options",
    icon: <MaterialCommunityIcons name="food-apple" size={24} color="black" />,
  },
  {
    id: "5",
    title: "Kidney Disease",
    description: "Low potassium and phosphorus foods",
    icon: <Ionicons name="ios-water" size={24} color="black" />,
  },
  {
    id: "6",
    title: "Weight Loss",
    description: "Low-calorie options",
    icon: <MaterialCommunityIcons name="weight" size={24} color="black" />,
  },
];

const foods = [
  {
    id: "1",
    title: "Salmon",
    image: require("./app/assets/quinoa.jpg"),
    description: "Rich in omega-3 fatty acids",
    category: "Heart Disease",
  },
  {
    id: "2",
    title: "Quinoa",
    image: require("./app/assets/quinoa.jpg"),
    description: "Gluten-free source of protein",
    category: "Gluten Intolerance",
  },
  {
    id: "3",
    title: "Broccoli",
    image: require("./app/assets/quinoa.jpg"),
    description: "High in vitamins and fiber",
    category: "Vegetarian",
  },
  {
    id: "4",
    title: "Avocado",
    image: require("./app/assets/quinoa.jpg"),
    description: "Healthy fats and nutrients",
    category: "Weight Loss",
  },
  {
    id: "5",
    title: "Sweet Potato",
    image: require("./app/assets/quinoa.jpg"),
    description: "Rich in antioxidants",
    category: "Diabetes",
  },
  {
    id: "6",
    title: "Spinach",
    image: require("./app/assets/quinoa.jpg"),
    description: "Low-calorie, high-nutrient",
    category: "Weight Loss",
  },
  {
    id: "7",
    title: "Chickpeas",
    image: require("./app/assets/quinoa.jpg"),
    description: "Good source of protein and fiber",
    category: "Vegetarian",
  },
  {
    id: "8",
    title: "Blueberries",
    image: require("./app/assets/quinoa.jpg"),
    description: "Antioxidant-rich berries",
    category: "Heart Disease",
  },
  {
    id: "9",
    title: "Oats",
    image: require("./app/assets/quinoa.jpg"),
    description: "Whole grain, high in fiber",
    category: "Diabetes",
  },
  {
    id: "10",
    title: "Almonds",
    image: require("./app/assets/quinoa.jpg"),
    description: "Healthy fats and protein",
    category: "Heart Disease",
  },
  {
    id: "11",
    title: "Kale",
    image: require("./app/assets/quinoa.jpg"),
    description: "Nutrient-dense leafy green",
    category: "Vegetarian",
  },
  {
    id: "12",
    title: "Lentils",
    image: require("./app/assets/quinoa.jpg"),
    description: "Excellent source of plant-based protein",
    category: "Vegan",
  },
];

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (route.name === "FoodList") {
              iconName = focused ? "list-outline" : "list-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={CategoryNavigator} />
        {/* <Tab.Screen name="FoodList" component={FoodNavigator} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
export { categories, foods };
