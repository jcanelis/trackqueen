import React from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { StatusBar } from "expo-status-bar"

// Screens
import LoginScreen from "../views/other/LoginScreen"

const LoginStack = () => (
  <>
    <StatusBar style={"light"} />
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)

export default LoginStack
