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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            presentation: "modal",
            headerShown: false,
            headerTransparent: true,
            headerLargeTitle: false,
            headerBlurEffect: "systemChromeMaterialDark",
          }}
        />
        <Stack.Screen
          name="Search nearby audio"
          component={SoundCheckScreen}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTransparent: true,
            headerLargeTitle: true,
            headerBlurEffect: "systemChromeMaterialDark",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)

export default AppNavigation
