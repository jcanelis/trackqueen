import React from "react"

// React Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import GPTQuestions from "../views/modals/GPTQuestions"
import GPTResponse from "../views/modals/GPTResponse"

const GPTStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"GPT Questions"} component={GPTQuestions} />
      <Stack.Screen name={"Powered by GPT-4 API"} component={GPTResponse} />
    </Stack.Navigator>
  )
}
export default GPTStack
