import React from "react"

// React Navigation
import { DarkTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { StatusBar } from "expo-status-bar"

// Screens
import LoadingScreen from "../views/other/LoadingScreen"
import ProfileStack from "../navigation/ProfileStack"
import SoundCheckScreen from "../views/modals/SoundCheckScreen"

// Components
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const LoadingStack = () => {
  return (
    <>
      <StatusBar style={"light"} />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="TrackQueen"
            component={LoadingScreen}
            options={{
              animation: "none",
              headerRight: () => <ToolbarAudioSearch />,
            }}
          />
          <Stack.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search nearby audio"
            component={SoundCheckScreen}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default LoadingStack
