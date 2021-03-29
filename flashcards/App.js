import * as React from 'react';
import { createStore } from 'redux';
import { LogBox } from "react-native";
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import reducer from './src/reducers';
import Quiz from './src/components/Quiz'
import Home from "./src/components/Home";
import NewCard from './src/components/NewCard'
import NewStack from "./src/components/NewStack";
import StackView from "./src/components/StackView";

LogBox.ignoreLogs(['Remote debugger']);

const Stack = createStackNavigator();

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Flash Cards' }} />
          <Stack.Screen name="StackDetail" component={StackView} options={{ title: 'Stack Details' }} />
          <Stack.Screen name="NewStack" component={NewStack} options={{ title: 'Add New Stack' }} />
          <Stack.Screen name="NewCard" component={NewCard} options={{ title: 'Add New Card' }} />
          <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;
