import React from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import GPTQuestions from "../views/modals/GPTQuestions"
import GPTResponse from "../views/modals/GPTResponse"

// Design
import { dark } from "../constants/Base"

const GPTStack = () => {
  const { colors } = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen name={"GPT Questions"} component={GPTQuestions} />
      <Stack.Screen name={"Powered by GPT-4 API"} component={GPTResponse} />
    </Stack.Navigator>
  )
}
export default GPTStack
