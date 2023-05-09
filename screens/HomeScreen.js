import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import Table from "../components/Table";
import {
  getListProducts,
  setSelectedProductId,
} from "../slices/products/actions";
import { selectProduct } from "../slices/products/productSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(selectProduct);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getListProducts());
  }, []);

  const onRowPress = (item) => {
    navigation.navigate("ProductScreen");
    console.log("onRowPress", item);
    dispatch(setSelectedProductId(item._id));
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Table data={list} onRowPress={onRowPress} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
