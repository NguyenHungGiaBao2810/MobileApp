import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import Mess from '../screen/Mess';
import Chat from '../screen/Chat';

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigationScreen() {
  return (
    <Stack.Navigator initialRouteName="Mess">
      <Stack.Screen name="Mess" component={Mess} options={{ headerShown: false }}/>
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default StackNavigationScreen;
