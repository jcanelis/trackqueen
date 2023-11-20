import React from "react"
import PropTypes from "prop-types"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { StatusBar } from "expo-status-bar"

// Screens
import LoginScreen from "../views/other/LoginScreen"

const LoginStack = ({ theme }) => (
  <>
    <StatusBar style={"light"} />
    <NavigationContainer theme={theme}>
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

LoginStack.propTypes = {
  theme: PropTypes.string,
}

export default LoginStack
