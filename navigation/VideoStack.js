import React, { useContext } from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import VideoScreen from "../views/VideoScreen"
import BioScreen from "../views/modals/BioScreen"
import VideoListScreen from "../views/modals/VideoListScreen"

// Context
import SpotifyContext from "../context/spotify"

// Components
import ToolbarProfile from "../components/ToolbarProfile"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const VideoStack = () => {
  const { dark, colors } = useTheme()
  const { currentlyPlaying } = useContext(SpotifyContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${currentlyPlaying.track} by ${currentlyPlaying.artist}`}
        component={VideoScreen}
        options={{
          headerLeft: () => <ToolbarProfile />,
          headerRight: () => <ToolbarAudioSearch />,
        }}
      />
      <Stack.Group>
        <Stack.Screen name={currentlyPlaying.artist} component={BioScreen} />
        <Stack.Screen
          name={`${currentlyPlaying.track} YouTube videos`}
          component={VideoListScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default VideoStack
