import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import * as Yup from "yup";
import Input from "../components/Input";
import { authFunction } from "../slices/user/actions";
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();

  let validationSchema = Yup.object({
    name: isLogin
      ? Yup.string()
      : Yup.string()
          .required("Required")
          .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
          .min(3, "Must be at least 3 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = (values) => {
    console.log("=====>", values);
    const onSuccess = () => {
      navigation.navigate("HomeScreen");
    };
    const role = checked ? "admin" : "user";
    if (isLogin) {
      dispatch(authFunction({ ...values, onSuccess }));
    } else {
      dispatch(authFunction({ ...values, role, onSuccess, isRegister: true }));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={tw`p-5 mt-40`}>
      {!isLogin && (
        <Input
          placeholder="Name"
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          value={formik.values.name}
          touched={formik.touched.name}
          error={formik.errors.name}
        />
      )}
      <Input
        placeholder="Email"
        onChange={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        touched={formik.touched.email}
        error={formik.errors.email}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        onChange={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        touched={formik.touched.password}
        error={formik.errors.password}
      />
      {!isLogin && (
        <Input
          label="Create user as admin (ONLY FOR DEMONSTRATION PURPOSES)"
          placeholder="isAdmin"
          value={checked}
          onChange={() => setChecked(!checked)}
          checkbox
        />
      )}

      <TouchableOpacity
        style={tw`bg-blue-500 text-white font-bold py-2 px-4 w-full rounded-full mb-5 mt-4`}
        onPress={formik.handleSubmit}
      >
        <Text style={tw`text-center text-white font-bold`}>
          {isLogin ? "Login" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsLogin(!isLogin);
          formik.resetForm();
        }}
      >
        <Text style={tw`text-blue-400`}>{isLogin ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
