import React, { useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { I18nManager } from 'react-native'
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import AlbumsScreen from './src/screens/Albums';
import ContainSignUpScreen from './src/screens/ContainSignUp';
import MyProfileScreen from './src/screens/MyProfile';
import EditProfileScreen from './src/screens/EditProfile';
import AddAccountScreen from './src/screens/AddAccounts';
import SettingsScreen from './src/screens/Settings';
import MyAlbumScreen from './src/screens/MyAlbum';
import openAlbumScreen from './src/screens/openAlbum';
import Splash from './src/screens/Splash'
import AsyncStorage from '@react-native-community/async-storage';
import { EventRegister } from 'react-native-event-listeners'
import { strings } from './src/languages/Localization'
import { spring } from 'react-native-reanimated';

const Stack = createStackNavigator();
const MyStack = () => {
  const STORAGE_THEME_KEY = '@save_theme'
  const STORAGE_LANGUAGE_KEY = '@save_language'
  const [theme, settheme] = useState('')
  const [language, setLanguage] = useState('')

  useEffect(() => {
    readData();
    const listener = EventRegister.addEventListener('changeThemeApp', (data) => {
      settheme(data)
    })
    return () => {
      EventRegister.removeEventListener(listener)

    }
  }, [language, theme])
  const DarkThem = {
    dark: false,
    colors: {
      primary: 'rgb(150, 150, 150)',
      background: 'rgb(45,45,45)',
      card: 'rgb(35, 35, 35)',
      text: 'rgb(255, 255, 255)',
      border: 'rgb(30, 30, 30)',
      notification: 'rgb(50, 50, 50)',
    },
  };
  const readData = async () => {
    try {
      const themeApp = await AsyncStorage.getItem(STORAGE_THEME_KEY)
      const languageApp = await AsyncStorage.getItem(STORAGE_LANGUAGE_KEY);
      if (languageApp !== null) {
        setLanguage(languageApp)
        if (languageApp === 'English') {
          strings.setLanguage('en')
          I18nManager.forceRTL(false)
          I18nManager.allowRTL(false)
        }
        else if (languageApp === 'Arabic العربيه') {
          strings.setLanguage('ar')
          I18nManager.forceRTL(true)
          I18nManager.allowRTL(true)

        }
        else if (languageApp === 'French') {
          strings.setLanguage('fr')
          I18nManager.forceRTL(false)
          I18nManager.allowRTL(false)
        }
      }
      if (themeApp !== null) {
        settheme(themeApp)
      }
    } catch (e) {
      alert('Failed to fetch the data from storagee')
    }
  }
  return (
    <NavigationContainer theme={theme == 'Dark' ? DarkThem : DefaultTheme}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen} />

        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="ContainSignUp" component={ContainSignUpScreen} />

        <Stack.Screen name="Albums" component={AlbumsScreen} options={{ headerShown: false }} />

        <Stack.Screen name="MyProfile" component={MyProfileScreen} />

        <Stack.Screen name="EditProfile" component={EditProfileScreen} />

        <Stack.Screen name="AddAccount" component={AddAccountScreen} />

        <Stack.Screen name="Settings" component={SettingsScreen} />

        <Stack.Screen name="MyAlbum" component={MyAlbumScreen} options={{ headerShown: false }} />

        <Stack.Screen name="openAlbum" component={openAlbumScreen} options={{ headerShown: false }} />

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MyStack;