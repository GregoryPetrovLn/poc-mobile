import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { AUTH_TOKEN } from "../service/storageItems";
import { getItemFromLocalStorage } from "../service/utils";
import { getListProducts, getProductById } from "../slices/products/actions";
import { selectProduct } from "../slices/products/productSlice";
import { selectUser } from "../slices/user/userSlice";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { selected, selectedId } = useSelector(selectProduct);
  const { name, price, quantity, description } = selected || {};
  const { user } = useSelector(selectUser);
  const isAdmin = user?.role === "admin";

  const onDelete = async () => {
    try {
      const token = await getItemFromLocalStorage(AUTH_TOKEN);
      await fetch(`${process.env.API_BASE_URL}/products/${selectedId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.navigate("HomeScreen");
      dispatch(getListProducts());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
    dispatch(getProductById(selectedId));
  }, [selectedId]);

  return (
    <View style={tw`flex-1 p-4`}>
      <View style={tw`mb-10`}>
        <Text style={tw`text-2xl font-bold`}>{name}</Text>
        <Text style={tw`text-gray-500`}>
          Price: ${price} | Quantity: {quantity} kg
        </Text>
        <Text style={tw`text-gray-500 mt-5`}>Description: {description}</Text>
      </View>

      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          disabled={!isAdmin}
          style={tw`flex-1 bg-red-500 py-2 rounded`}
          onPress={onDelete}
        >
          <Text style={tw`text-white text-center font-bold`}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductScreen;
