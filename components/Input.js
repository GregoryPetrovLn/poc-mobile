import React from "react";
import { Text, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const Input = ({
  placeholder,
  secureTextEntry,
  onChange,
  onBlur,
  value,
  touched,
  error,
  label,
  checkbox,
}) => {
  return (
    <>
      {label && !checkbox && <Text>{label}</Text>}
      {checkbox ? (
        <CheckBox
          title={label}
          checked={value}
          onPress={onChange}
          containerStyle={tw`bg-transparent border-transparent`}
          textStyle={tw`text-gray-700`}
          checkedColor={tw.color("blue-500")}
        />
      ) : (
        <TextInput
          style={tw`bg-white border border-gray-300 rounded p-2 mb-2`}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}

      {touched && error ? (
        <Text style={tw`text-red-500 mb-2`}>{error}</Text>
      ) : null}
    </>
  );
};

export default Input;
