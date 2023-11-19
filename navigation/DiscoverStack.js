import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import ArtistListScreen from "../views/modals/ArtistListScreen"
import ArtistTracksScreen from "../views/modals/ArtistTracksScreen"
import DiscoverScreen from "../views/DiscoverScreen"
import GPTResponse from "../views/modals/GPTResponse"
import TrackListScreen from "../views/modals/TrackListScreen"

// Stack
import GPTStack from "./GPTStack"

// Components
import ToolbarProfile from "../components/ToolbarProfile"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

const DiscoverStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { artist } = currentlyPlaying
  const { track } = currentlyPlaying

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={DiscoverScreen}
        options={{
          headerLeft: () => <ToolbarProfile />,
          headerRight: () => <ToolbarAudioSearch />,
        }}
      />

      <Stack.Screen
        name={`Similar to ${artist}`}
        component={ArtistListScreen}
      />

      <Stack.Screen name="Top Tracks" component={ArtistTracksScreen} />

      <Stack.Screen
        name={`${track} TracksListScreen`}
        component={TrackListScreen}
      />

      <Stack.Screen
        name={"Ask ChatGPT"}
        component={GPTStack}
        navigationKey={track}
      />

      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
        options={{
          presentation: "card",
        }}
      />
    </Stack.Navigator>
  )
}

export default DiscoverStack
