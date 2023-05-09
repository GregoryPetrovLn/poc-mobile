import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { AUTH_TOKEN, FAVORITES_LIST } from "../service/storageItems";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "../service/utils";
import {
  getListProducts,
  getProductById,
  setFavorites,
} from "../slices/products/actions";
import { selectProduct } from "../slices/products/productSlice";
import { selectUser } from "../slices/user/userSlice";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [inFavorite, setInFavorite] = useState(false);

  const { selected, selectedId, favorites } = useSelector(selectProduct);
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

  useEffect(() => {
    const isnclude = favorites.indexOf(selectedId) > -1;

    setInFavorite(isnclude);
  }, [favorites]);

  const addToFavoritesHandler = async () => {
    let newArray = favorites;
    if (inFavorite) {
      const index = favorites.indexOf(selectedId);
      newArray = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
    } else {
      newArray = [...favorites, selectedId];
    }

    dispatch(setFavorites(newArray));
    await setItemToLocalStorage(FAVORITES_LIST, newArray);
  };
  console.log("favorites", favorites, inFavorite);
  return (
    <View style={tw`flex-1 p-4`}>
      <View style={tw`mb-10`}>
        <View style={tw`flex flex-row justify-between mb-5`}>
          <Text style={tw`text-2xl font-bold`}>{name}</Text>
          <TouchableOpacity
            style={tw`py-2 px-5 rounded ${
              inFavorite ? "bg-yellow-400" : " bg-blue-300"
            }`}
            onPress={addToFavoritesHandler}
          >
            <Text style={tw`text-white text-center font-bold`}>
              {inFavorite ? "Remove from favorites" : "Add to favorites"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={tw`text-gray-500`}>
          Price: ${price} | Quantity: {quantity} kg
        </Text>
        <Text style={tw`text-gray-500 mt-5`}>Description: {description}</Text>
      </View>

      <View style={tw`flex-row justify-center`}>
        <TouchableOpacity
          disabled={!isAdmin}
          style={tw`flex-1 py-2 rounded ${
            isAdmin ? " bg-red-500" : " bg-gray-300"
          }`}
          onPress={onDelete}
        >
          <Text style={tw`text-white text-center font-bold`}>Delete</Text>
        </TouchableOpacity>
      </View>
      {!isAdmin && (
        <Text style={tw`text-gray-400 text-sm text-center mt-1`}>
          Only admins can delete
        </Text>
      )}
    </View>
  );
};

export default ProductScreen;
