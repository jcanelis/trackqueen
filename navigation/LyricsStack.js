import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import ArtistTracksScreen from "../views/modals/ArtistTracksScreen"
import BioScreen from "../views/modals/BioScreen"
import GeniusScreen from "../views/modals/GeniusScreen"
import GPTResponse from "../views/modals/GPTResponse"
import LyricsScreen from "../views/LyricsScreen"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"
import DetailNavigationBar from "../components/DetailNavigationBar"

const LyricsStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={LyricsScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
        navigationKey={track}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={artist}
        component={BioScreen}
        navigationKey={track}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name="Top Tracks"
        component={ArtistTracksScreen}
        navigationKey={track}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={`${track} on Genius`}
        component={GeniusScreen}
        navigationKey={track}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default LyricsStack
