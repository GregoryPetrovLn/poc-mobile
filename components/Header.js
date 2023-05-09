import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { AUTH_TOKEN } from "../service/storageItems";
import { getItemFromLocalStorage } from "../service/utils";
import { logoutFunction } from "../slices/user/actions";
import { selectUser } from "../slices/user/userSlice";

const Header = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectUser);
  const handleAuth = () => {
    const token = getItemFromLocalStorage(AUTH_TOKEN);
    if (token) {
      dispatch(logoutFunction());
    } else {
      // Perform the desired navigation action
      // navigation.navigate('')
    }
  };

  return (
    <SafeAreaView>
      <View style={tw`shadow-md p-5 flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <View style={tw`flex flex-row items-center`}>
            <Text style={tw`font-bold text-lg`}>Online Market</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={tw`bg-gray-200 p-2 rounded-md`}
            onPress={handleAuth}
          >
            <Text style={tw`font-bold`}>
              {loading ? "Loading..." : user ? `Hello ${user.name}` : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
