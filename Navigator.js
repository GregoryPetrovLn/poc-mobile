import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeScreen, LoginScreen } from "./screens";
import { USER } from "./service/storageItems";
import { getItemFromLocalStorage } from "./service/utils";
import { setUser } from "./slices/user/actions";
import { selectUser } from "./slices/user/userSlice";
const screens = [
  {
    name: "HomeScreen",
    component: HomeScreen,
    options: { headerShown: false },
  },
];

const Navigator = () => {
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();
  const { user } = useSelector(selectUser);
  useEffect(() => {
    const user = getItemFromLocalStorage(USER);
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);
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
