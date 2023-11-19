import React from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { StatusBar } from "expo-status-bar"

// Stacks
import AppTabs from "./AppTabs"
import ProfileStack from "./ProfileStack"

// Screens
import SoundCheckScreen from "../views/modals/SoundCheckScreen"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"

const AppNavigation = ({ theme }) => (
  <>
    <StatusBar style={"light"} />
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
        <Stack.Screen name="Search nearby audio" component={SoundCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)

export default AppNavigation
