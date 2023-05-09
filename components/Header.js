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
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 4,
          backgroundColor: "white",
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <HomeIcon style={{ width: 24, height: 24, marginRight: 8 }} /> */}
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Online Market
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={tw`bg-gray-200 p-2 rounded-md`}
            onPress={handleAuth}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {loading ? "Loading..." : user ? `Hello ${user.name}` : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
