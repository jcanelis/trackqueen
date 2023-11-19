import React from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
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
import ToolbarProfile from "../components/ToolbarProfile"

const LoadingStack = () => {
  return (
    <>
      <StatusBar style={"light"} />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="TrackQueen"
            component={LoadingScreen}
            options={() => ({
              headerLeft: () => <ToolbarProfile />,
              headerRight: () => <ToolbarAudioSearch />,
            })}
          />

          <Stack.Screen name="ProfileStack" component={ProfileStack} />

          <Stack.Screen
            name="Search nearby audio"
            component={SoundCheckScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default LoadingStack
