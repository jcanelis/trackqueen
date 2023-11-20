import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import CommentsScreen from "../views/CommentsScreen"
import GPTResponse from "../views/modals/GPTResponse"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"
import DetailNavigationBar from "../components/DetailNavigationBar"
import ToolbarProfile from "../components/ToolbarProfile"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const CommentsStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={CommentsScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />
      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default CommentsStack
