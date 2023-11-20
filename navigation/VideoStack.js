import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import VideoScreen from "../views/VideoScreen"
import VideoListScreen from "../views/modals/VideoListScreen"

// Context
import SpotifyContext from "../context/spotify"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"
import DetailNavigationBar from "../components/DetailNavigationBar"

const VideoStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={VideoScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={`${track} YouTube videos`}
        component={VideoListScreen}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default VideoStack
