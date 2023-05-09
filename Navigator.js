import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import { HomeScreen, LoginScreen } from "./screens";
import ProductScreen from "./screens/ProductScreen";
import { FAVORITES_LIST, USER } from "./service/storageItems";
import { getItemFromLocalStorage, renderScreens } from "./service/utils";
import { setFavorites } from "./slices/products/actions";
import { setUser } from "./slices/user/actions";
import { selectUser } from "./slices/user/userSlice";
const screens = [
  {
    name: "HomeScreen",
    component: HomeScreen,
    options: { headerShown: false },
  },
  {
    name: "ProductScreen",
    component: ProductScreen,
    options: { headerShown: false },
  },
];

const Navigator = () => {
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();
  const { user } = useSelector(selectUser);

  const getUserData = async () => {
    const data = await getItemFromLocalStorage(USER);
    if (data) {
      dispatch(setUser(data));
    }
    return data;
  };

  const getFavoritesData = async () => {
    const data = await getItemFromLocalStorage(FAVORITES_LIST);
    if (data) {
      dispatch(setFavorites(data));
    }
  };

  useEffect(() => {
    getUserData();
    getFavoritesData();
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
