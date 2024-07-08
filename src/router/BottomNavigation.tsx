import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RootStackParamList } from './RootStackParamList';
import NoteList from '../screen/NoteList';
import StackNavigationScreen from './StackNavigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          const scale = useSharedValue(1);

          if (focused) {
            scale.value = withTiming(1.2, { duration: 300 });
          } else {
            scale.value = withTiming(1, { duration: 300 });
          }

          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [{ scale: scale.value }],
            };
          });

          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Stack') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          }
          else if (route.name === 'NoteList') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          }

          return (
            <Animated.View style={animatedStyle}>
             <Ionicons name={iconName || ""} size={size} color={focused ? 'coral' : '#676767'} />
            </Animated.View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stack" component={StackNavigationScreen} />
      <Tab.Screen name="NoteList" component={NoteList} />
    </Tab.Navigator>
  );
}

export default MyTabs;
