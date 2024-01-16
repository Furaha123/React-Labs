import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppForm from "../components/forms/AppForm";
import AppInput from "../components/forms/AppInput";
import AppButton from "../components/forms/AppButton";
import { useFormikContext } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const AppFormField = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, touched, errors } = useFormikContext();
  return (
    <>
      <AppInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};
const ErrorMessage = ({ error, visible }) => {
  if (!error || !visible) return null;
  return <AppText value={error} color={colors.tomato} />;
};
export const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} />;
};
const AddFood = () => {
  //  get the foods from the storage
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const getFoods = async () => {
      const data = await AsyncStorage.getItem("foods");
      if (data) {
        setFoods(JSON.parse(data));
      }
    };
    getFoods();
  }, []);
  const navigation = useNavigation();

  const handleAddFood = async (values) => {
    const food = {
      id: Math.random().toString(),
      title: values.title,
      description: values.description,
      category: values.category,
    };
    const newFoods = [...foods, food];
    setFoods(newFoods);
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
    navigation.navigate("Home");
  };

  return (
    <View>
      <AppForm
        initialValues={{ title: "", description: "", category: "" }}
        onSubmit={async (values) => await handleAddFood(values)}
      >
        <View style={{ gap: 20, margin: 10 }}>
          <AppFormField name="title" placeholder="Title" />
          <AppFormField name="description" placeholder="Description" />
          <AppFormField name="category" placeholder="Category" />
          <SubmitButton title="Add Activities"  />
        </View>
      </AppForm>
    </View>
  );
};

export default AddFood;

const styles = StyleSheet.create({
  
});
