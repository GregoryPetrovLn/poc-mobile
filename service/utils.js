import AsyncStorage from "@react-native-async-storage/async-storage";

export const renderScreens = (Stack, screens) =>
  screens.map((screen, idx) => <Stack.Screen key={idx} {...screen} />);

export const getItemFromLocalStorage = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);
    console.log("from here--->", item);
    if (item === null) {
      return null;
    }
    console.log("before return", item, typeof item);
    return JSON.parse(item);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setItemToLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

// Clear AsyncStorage
export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully.");
  } catch (error) {
    console.log("Failed to clear AsyncStorage:", error);
  }
};
