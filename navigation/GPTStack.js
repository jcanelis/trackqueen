import React from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import GPTQuestions from "../views/modals/GPTQuestions"
import GPTResponse from "../views/modals/GPTResponse"

// Components
import DetailNavigationBar from "../components/DetailNavigationBar"

const GPTStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"GPT Questions"} component={GPTQuestions} />
      <Stack.Screen name={"Powered by GPT-4 API"} component={GPTResponse} />
    </Stack.Navigator>
  )
}
export default GPTStack
