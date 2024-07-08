import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/router/DrawerNavigation'

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
        <DrawerNavigator />
    </NavigationContainer>
    </Provider>
  )
}