import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import AboutScreen from "../views/AboutScreen"
import AlbumTracks from "../views/modals/AlbumTracks"
import ArtistTracksScreen from "../views/modals/ArtistTracksScreen"
import CreditsScreen from "../views/modals/CreditsScreen"
import GPTResponse from "../views/modals/GPTResponse"

// Stack
import GPTStack from "./GPTStack"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"
import ToolbarProfile from "../components/ToolbarProfile"

const AboutStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { artist } = currentlyPlaying
  const { track } = currentlyPlaying
  const album = currentlyPlaying.spotifyData.album.name

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={AboutScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={album}
        component={AlbumTracks}
        navigationKey={track}
      />

      <Stack.Screen
        name="Credits"
        component={CreditsScreen}
        navigationKey={track}
      />

      <Stack.Screen
        name={"Ask ChatGPT"}
        component={GPTStack}
        navigationKey={track}
      />

      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
        navigationKey={track}
      />

      <Stack.Screen
        name="Top Tracks"
        component={ArtistTracksScreen}
        navigationKey={track}
      />
    </Stack.Navigator>
  )
}

export default AboutStack
