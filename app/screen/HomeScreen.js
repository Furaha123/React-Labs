import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CategoryCard from "../components/CategoryCard";
import AppButton from "../components/forms/AppButton";
import AppInput from "../components/forms/AppInput";
import { AppFormField, SubmitButton } from "./AddFood";
import AppForm from "../components/forms/AppForm";
import ReusableModal from "../components/ReusableModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase("food.db");

const HomeScreen = () => {
  const navigation = useNavigation();

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists categories (id integer primary key not null, title text, description text);",
        [],
        () => console.log("table created successfully"),
        (err) => console.log(err)
      );
    });
  };

  const insertCategory = (title, description) => {
    db.transaction((tx) => {
      tx.executeSql(
        "insert into categories (title, description) values (?, ?);",
        [title, description],
        () => console.log("inserted successfully"),
        (err) => console.log(err)
      );
    });
  };
  const [categories, setCategories] = useState([]);


  const getCategories = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from categories;", [], (_, { rows }) => {
        console.log(JSON.stringify(rows));
        setCategories(rows._array);
      });
    });
  };

  useEffect(() => {
    createTable();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddCategory = async (values) => {
    // const category = {
    //   id: Math.random().toString(),
    //   title: values.title,
    //   description: values.description,
    //   icon: <MaterialCommunityIcons name="food" size={30} color={"blue"} />,
    // };
    // const newCategories = [...categories, category];
    // setCategories(newCategories);
    // await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
    // toggleModal();
    insertCategory(values.title, values.description);
    toggleModal();
    getCategories();
  };

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const data = await AsynhcStorage.getItem("categories");
  //     if (data) {
  //       setCategories(
  //         JSON.parse(data).map((category) => ({
  //           ...category,
  //           icon: (
  //             <MaterialCommunityIcons name="food" size={30} color={"blue"} />
  //           ),
  //         }))
  //       );
  //     }
  //   };
  //   getCategories();
  // }, []);

  const handleDeleteCategory = async (id) => {
    // const newCategories = categories.filter((category) => category.id !== id);
    // setCategories(newCategories);
    // await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
    db.transaction((tx) => {
      tx.executeSql("delete from categories where id = ?;", [id]);
    });
    getCategories();
  };
  const [isModalVisibleUpdate, setModalVisibleUpdate] = useState(false);

  const toggleModalUpdate = () => {
    setModalVisibleUpdate(!isModalVisibleUpdate);
  };

  const [selectedCategory, setSelectedCategory] = useState({});

  const handleSelect = (item) => {
    console.log(item);
    setSelectedCategory(item);
    toggleModalUpdate();
  };

  const handleUpdateCategory = async (values) => {
    // const newCategories = categories.map((category) =>
    //   category.id === selectedCategory.id
    //     ? {
    //         ...category,
    //         title: values.title,
    //         description: values.description,
    //       }
    //     : category
    // );
    // setCategories(newCategories);
    // await AsyncStorage.setItem("categories", JSON.stringify(newCategories));
    db.transaction((tx) => {
      tx.executeSql(
        "update categories set title = ?, description = ? where id = ?;",
        [values.title, values.description, selectedCategory.id]
      );
      getCategories();
    });

    toggleModalUpdate();
    getCategories();
  };

  return (
    <View style={styles.container}>
      <ReusableModal isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <Text style={styles.modalTitle}>Add New Category</Text>
        <AppForm
          initialValues={{ title: "", description: "" }}
          onSubmit={async (values) => {
            return await handleAddCategory(values);
          }}
        >
          <AppFormField placeholder="Add Category" name="title" />
          <AppFormField placeholder="Add Description" name="description" />
          <SubmitButton title="Add Category" />
        </AppForm>
      </ReusableModal>

      {/*  Modal to update  */}
      <ReusableModal
        isModalVisible={isModalVisibleUpdate}
        toggleModal={toggleModalUpdate}
      >
        <Text style={styles.modalTitle}>Update Category</Text>
        <AppForm
          initialValues={{
            title: selectedCategory.title || "",
            description: selectedCategory.description || "",
          }}
          enableReinitialize={true}
          onSubmit={async (values) => await handleUpdateCategory(values)}
        >
          <AppFormField placeholder="Add Category" name="title" />
          <AppFormField placeholder="Add Description" name="description" />
          <SubmitButton title="Update Category" />
        </AppForm>
      </ReusableModal>

      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <AppButton title={"Add Category"} onPress={toggleModal} />
      </TouchableOpacity>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        style={{ margin: 10 }}
        renderItem={({ item }) => (
          <CategoryCard
            handleDeleteCategory={handleDeleteCategory}
            category={item}
            handleSelect={handleSelect}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default HomeScreen;
