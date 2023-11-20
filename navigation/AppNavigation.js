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
import ProfileScreen from "../views/modals/ProfileScreen"
import SoundCheckScreen from "../views/modals/SoundCheckScreen"

// Components
import DetailNavigationBar from "../components/DetailNavigationBar"

const AppNavigation = ({ theme }) => (
  <>
    <StatusBar style={"light"} />
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="AppTabs"
          component={AppTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Your recent tracks"
          component={ProfileScreen}
          options={{
            headerShown: true,
            header: (props) => <DetailNavigationBar {...props} />,
          }}
        />

        <Stack.Screen
          name="Search nearby audio"
          component={SoundCheckScreen}
          options={{
            headerShown: true,
            header: (props) => <DetailNavigationBar {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
)

export default AppNavigation
