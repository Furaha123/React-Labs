import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import AppButton from "../components/forms/AppButton";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppForm from "../components/forms/AppForm";
import AppInput from "../components/forms/AppInput";
import AppSelect from "../components/forms/AppSelect";
import { AppFormField, SubmitButton } from "./AddFood";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReusableModal from "../components/ReusableModel";

const FoodList = ({ route }) => {
  const category = route.params.category.title;
  console.log(category);
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [foodsList, setFoods] = useState([]);

  const handleSelect = (item) => {
    setSelectedProduct(item);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await AsyncStorage.getItem("categories");
      if (data) {
        setCategories(JSON.parse(data));
      }
    };
    const getFoods = async () => {
      const data = await AsyncStorage.getItem("foods");
      if (data) {
        setFoods(JSON.parse(data));
      }
    };
    getFoods();
    getCategories();
  }, []);

  console.log(foodsList);

  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View
        style={{
          //   width: "80%",
          margin: 15,
        }}
      >
        <AppButton
          title={"Add Event"}
          onPress={() => navigation.navigate("AddEvent")}
        
        />
      </View>
      <FlatList
        data={
          !category
            ? foodsList
            : foodsList.filter((food) => food.category === category)
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard handleSelect={handleSelect} food={item} />
        )}
      />
      <ReusableModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <Text style={styles.modalTitle}>Update Event</Text>
        <AppForm
          initialValues={{
            title: selectedProduct.title,
            description: selectedProduct.description,
            categoryName: selectedProduct.categoryName,
            image: selectedProduct.image,
          }}
          onSubmit={(values) => console.log(values)}
        >
          <AppFormField name={"title"} placeholder="Title" />
          <AppFormField name={"description"} placeholder="Description" />
          <AppFormField name={"image"} placeholder="Image" />
          <AppSelect
            items={categories.map((category) => category.title)}
            defaultButtonText={"Select Category"}
            name="categoryName"
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <SubmitButton title={"Update Event"} />
        </AppForm>
      </ReusableModal>
    </View>
  );
};

export default FoodList;

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
  appbtn: {
    backgroundColor: "#fff",
  },
});
