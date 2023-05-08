import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Navigator from "./Navigator";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
