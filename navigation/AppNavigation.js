import React from "react"

// React Navigation
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { StatusBar } from "expo-status-bar"

// Stacks
import AppTabs from "./AppTabs"
import ProfileStack from "./ProfileStack"

// Screens
import SoundCheckScreen from "../views/modals/SoundCheckScreen"

const AppNavigation = () => (
  <>
    <StatusBar style={"light"} />
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen name="ProfileStack" component={ProfileStack} />
        <Stack.Screen name="Search nearby audio" component={SoundCheckScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)

export default AppNavigation
