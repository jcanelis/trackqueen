import React, { useContext, useState } from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
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
import ToolbarProfile from "../components/ToolbarProfile"
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"

// Documentation for React Navigation's headerSearchBarOptions
// https://reactnavigation.org/docs/native-stack-navigator/#headersearchbaroptions

const LyricsStack = () => {
  const { dark, colors } = useTheme()
  const { currentlyPlaying } = useContext(SpotifyContext)
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
          name={`${currentlyPlaying.track} by ${currentlyPlaying.artist}`}
          component={LyricsScreen}
          options={{
            animation: "none",
            headerShown: true,
            headerLargeTitle: true,
            headerTransparent: true,
            headerLargeTitleShadowVisible: true,
            headerTintColor: colors.text,
            headerBlurEffect: dark
              ? "systemChromeMaterialDark"
              : "systemUltraThinMaterial",
            headerLargeTitleStyle: { color: colors.text },
            headerLeft: () => <ToolbarProfile />,
            headerRight: () => <ToolbarAudioSearch />,
          }}
        />

        <Stack.Screen
          name={"Powered by GPT-4 API"}
          component={GPTResponse}
          navigationKey={currentlyPlaying.track}
          options={{
            presentation: "modal",
            headerShown: true,
            headerTransparent: true,
            headerTintColor: colors.text,
            headerLargeTitle: false,
            headerLargeTitleStyle: { color: colors.text },
            headerBlurEffect: dark
              ? "systemChromeMaterialDark"
              : "systemUltraThinMaterial",
          }}
        />

        <Stack.Screen
          name={currentlyPlaying.artist}
          component={BioScreen}
          navigationKey={currentlyPlaying.track}
          options={{
            headerShown: true,
            headerLargeTitle: true,
            headerBackTitle: "Back",
            headerTintColor: colors.text,
            headerLargeTitleStyle: { color: colors.text },
            headerTransparent: true,
            headerBlurEffect: dark
              ? "systemChromeMaterialDark"
              : "systemUltraThinMaterial",
          }}
        />

        <Stack.Screen
          name="Top Tracks"
          component={ArtistTracksScreen}
          navigationKey={currentlyPlaying.track}
          options={{
            presentation: "modal",
            headerTransparent: true,
            headerTintColor: colors.text,
            headerBlurEffect: dark
              ? "systemChromeMaterialDark"
              : "systemUltraThinMaterial",
          }}
        />

        <Stack.Screen
          name={`${currentlyPlaying.track} on Genius`}
          component={GeniusScreen}
          navigationKey={currentlyPlaying.track}
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            headerTintColor: colors.text,
            headerLargeTitle: true,
            headerLargeTitleStyle: { color: colors.text },
            headerTransparent: true,
            headerBlurEffect: "dark",
            headerSearchBarOptions: {
              placeholder: "Search Genius.com annotations",
              barTintColor: dark ? colors.background : "#cccccc",
              textColor: colors.text,
              headerIconColor: colors.text,
              autoCapitalize: "none",
              onChangeText: (event) => {
                updateText(event.nativeEvent.text)
              },
              onCancelButtonPress: () => true,
            },
          }}
        />
      </Stack.Navigator>
    </SearchContext.Provider>
  )
}

export default LyricsStack
