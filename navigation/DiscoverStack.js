import React, { useContext } from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Expo
import { useAssets } from "expo-asset"

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
  const { colors, dark } = useTheme()
  const { currentlyPlaying } = useContext(SpotifyContext)

  // Local asset with Expo useAssets
  const [assets, error] = useAssets([require("../assets/tile.png")])

  if (error) {
    console.error("Error loading local assets", error)
  }

  if (!assets) {
    return null
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${currentlyPlaying.track} by ${currentlyPlaying.artist}`}
        component={DiscoverScreen}
        options={{
          animation: "none",
          headerShown: true,
          headerLargeTitle: true,
          headerTransparent: true,
          headerLeft: () => <ToolbarProfile />,
          headerRight: () => <ToolbarAudioSearch />,
        }}
      />

      <Stack.Screen
        name="Top Tracks"
        component={ArtistTracksScreen}
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
        name={`Similar to ${currentlyPlaying.artist}`}
        component={ArtistListScreen}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerLargeTitle: true,
          headerTintColor: colors.text,
          headerTransparent: true,
          headerLargeTitleStyle: { color: colors.text },
          headerBlurEffect: dark
            ? "systemChromeMaterialDark"
            : "systemUltraThinMaterial",
        }}
      />

      <Stack.Screen
        name={"Ask ChatGPT"}
        component={GPTStack}
        navigationKey={currentlyPlaying.track}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerTransparent: true,
          headerTintColor: colors.text,
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: colors.text },
          headerBlurEffect: "dark",
        }}
      />

      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
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
        name={`${currentlyPlaying.track} TracksListScreen`}
        component={TrackListScreen}
        options={{
          headerShown: true,
          headerBackTitle: "Back",
          headerLargeTitle: true,
          headerTintColor: colors.text,
          headerTransparent: true,
          headerLargeTitleStyle: { color: colors.text },
          headerBlurEffect: dark
            ? "systemChromeMaterialDark"
            : "systemUltraThinMaterial",
        }}
      />
    </Stack.Navigator>
  )
}

export default DiscoverStack
