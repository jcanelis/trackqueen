import React, { useContext } from "react"

// React Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import CommentsScreen from "../views/CommentsScreen"
import GPTResponse from "../views/modals/GPTResponse"

// Components
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const CommentsStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${currentlyPlaying.track} by ${currentlyPlaying.artist}`}
        component={CommentsScreen}
        options={{
          animation: "none",
          headerRight: () => <ToolbarAudioSearch />,
        }}
      />
      <Stack.Screen name={"Powered by GPT-4 API"} component={GPTResponse} />
    </Stack.Navigator>
  )
}

export default CommentsStack
