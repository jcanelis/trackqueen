import React, { useContext } from "react"
import { useWindowDimensions } from "react-native"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()
import { HeaderHeightContext } from "@react-navigation/elements"

// Expo
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

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
import ToolbarAudioSearch from "../components/ToolbarAudioSearch"
import ToolbarProfile from "../components/ToolbarProfile"

// Design
import { baseUnit, blurhash } from "../constants/Base"

const AboutStack = () => {
  const { dark, colors } = useTheme()
  const { width } = useWindowDimensions()
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
        component={AboutScreen}
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
        name={`${currentlyPlaying.spotifyData.album.name}`}
        component={AlbumTracks}
        navigationKey={currentlyPlaying.track}
        options={{
          headerBackTitle: "Back",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.text,
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: colors.text },
          headerBlurEffect: "systemUltraThinMaterialDark",
          headerBackground: () => (
            <HeaderHeightContext.Consumer>
              {(headerHeight) => {
                return (
                  <Image
                    source={currentlyPlaying.spotifyData.album.images[0].url}
                    placeholder={blurhash}
                    transition={250}
                    width={width}
                    height={headerHeight - baseUnit}
                    contentFit={"cover"}
                  />
                )
              }}
            </HeaderHeightContext.Consumer>
          ),
        }}
      />

      <Stack.Screen
        name="Credits"
        component={CreditsScreen}
        navigationKey={currentlyPlaying.track}
        options={{
          headerBackTitle:
            currentlyPlaying.track.length > 20
              ? "Back"
              : currentlyPlaying.track,
          headerTransparent: true,
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: colors.text },
          headerTintColor: colors.text,
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
          headerBackground: () => (
            <HeaderHeightContext.Consumer>
              {(headerHeight) => {
                return (
                  <Image
                    source={assets[0].localUri}
                    placeholder={blurhash}
                    transition={250}
                    width={width}
                    height={headerHeight - baseUnit}
                    contentFit={"cover"}
                  />
                )
              }}
            </HeaderHeightContext.Consumer>
          ),
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
          headerBlurEffect: "dark",
        }}
      />
    </Stack.Navigator>
  )
}

export default AboutStack
