import React, { ReactElement } from 'react';
import type { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import CreateNote from './src/screens/createNote';

const Stack = createNativeStackNavigator();

function App(): ReactElement {
  const isDarkMode = useColorScheme() === 'dark';

  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
