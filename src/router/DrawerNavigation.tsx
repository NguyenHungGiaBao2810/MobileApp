import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { RootStackParamList } from './RootStackParamList';
import Login from '../screen/Login';
import MyTabs from './BottomNavigation';
import Intro from '../intro/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator<RootStackParamList>();

function CustomDrawerContent(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsLoggedIn(false);
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      {isLoggedIn ? (
        <>
          <DrawerItem label="Logout" onPress={handleLogout} />
        </>
      ) : (
        <DrawerItem label="Login" onPress={() => props.navigation.navigate('Login')} />
      )}
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Intro"
    >
      <Drawer.Screen name="BottomTab" component={MyTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Drawer.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;