import React, { useContext, useState } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SearchContext from "../context/search"
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
import ToolbarProfile from "../components/ToolbarProfile"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

// Paper
import { useTheme } from "react-native-paper"

// Design
// import { GOLD } from "../constants/Base"

const LyricsStack = () => {
  const { dark, colors } = useTheme()
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying
  let [text, updateText] = useState("")

  return (
    <SearchContext.Provider value={text}>
      <Stack.Navigator
        screenListeners={() => ({
          state: (e) => {
            // Clear the search text
            if (e.data.state.index == 0) {
              updateText("")
            }
          },
        })}
      >
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
        />

        <Stack.Screen
          name={artist}
          component={BioScreen}
          navigationKey={track}
        />

        <Stack.Screen
          name="Top Tracks"
          component={ArtistTracksScreen}
          navigationKey={track}
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
    </SearchContext.Provider>
  )
}

export default LyricsStack
