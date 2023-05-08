import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
