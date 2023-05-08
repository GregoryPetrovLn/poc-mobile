import React from "react";
import { Text, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";

const Input = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  onBlur,
  value,
  touched,
  error,
}) => {
  return (
    <>
      <TextInput
        style={tw`bg-white border border-gray-300 rounded p-2 mb-2`}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {touched && error ? (
        <Text style={tw`text-red-500 mb-2`}>{error}</Text>
      ) : null}
    </>
  );
};

export default Input;
