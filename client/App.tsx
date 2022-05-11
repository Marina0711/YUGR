import React, {createContext} from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import {RootNavigator} from "./src/navigation/RootNavigator";
import UserStore from "./src/store/UserStore";
import ProductStore from "./src/store/ProductStore";

export const Context = createContext<any | null>(null)

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <Context.Provider value={{
          user: new UserStore(),
          product: new ProductStore()
      }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
      </Context.Provider>
  );
};

export default App;
