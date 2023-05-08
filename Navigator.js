import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import { HomeScreen, LoginScreen } from "./screens";
import { selectUser } from "./slices/user/userSlice";
const screens = [
  {
    name: "HomeScreen",
    component: HomeScreen,
    options: { headerShown: false },
  },
];

const Navigator = () => {
  const Stack = createNativeStackNavigator();
  const { user } = useSelector(selectUser);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
