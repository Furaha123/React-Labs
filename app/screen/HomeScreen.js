import React, { useEffect, useState, useRef } from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
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
import * as SQLite from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";

const db = SQLite.openDatabase("food.db");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isModalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  const getCategories = () => {
    db.transaction((tx) => {
      tx.executeSql("select * from categories;", [], (_, { rows }) => {
        //console.log(JSON.stringify(rows));
        setCategories(rows._array);
      });
    });
  };

  useEffect(() => {
    createTable();
    getCategories();
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };


  }, []);

  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleAddCategory = async (values) => {
    insertCategory(values.title, values.description);
    toggleModal();
    getCategories();
    schedulePushNotification("New category added", values.description);
  };

  const handleDeleteCategory = async (id) => {
    db.transaction((tx) => {
      tx.executeSql("delete from categories where id = ?;", [id]);
    });
    getCategories();
  };
  

  const toggleModalUpdate = () => {
    setModalVisibleUpdate(!isModalVisibleUpdate);
  };


  const handleSelect = (item) => {
    console.log(item);
    setSelectedCategory(item);
    toggleModalUpdate();
  };

  const handleUpdateCategory = async (values) => {
    db.transaction((tx) => {
      tx.executeSql(
        "update categories set title = ?, description = ? where id = ?;",
        [values.title, values.description, selectedCategory.id]
      );
      getCategories();
    });
    schedulePushNotification(values.title, values.description);
    toggleModalUpdate();
    getCategories();
  };
  async function schedulePushNotification(title, description) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: description,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
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
