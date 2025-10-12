import React, { useContext } from "react"

// React Navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Screens
import VideoScreen from "../views/VideoScreen"
import BioScreen from "../views/modals/BioScreen"
import VideoListScreen from "../views/modals/VideoListScreen"

// Context
import SpotifyContext from "../context/spotify"

// Components
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const VideoStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${currentlyPlaying.track} by ${currentlyPlaying.artist}`}
        component={VideoScreen}
        options={{
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
