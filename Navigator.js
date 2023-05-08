import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { HomeScreen, LoginScreen } from "./screens";
import { USER } from "./service/storageItems";
import { getItemFromLocalStorage, renderScreens } from "./service/utils";
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

  const getData = async () => {
    const data = await getItemFromLocalStorage(USER);
    if (data) {
      dispatch(setUser(data));
    }
    return data;
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {user && <Header />}
      <Stack.Navigator>
        {user ? (
          renderScreens(Stack, screens)
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default Navigator;
