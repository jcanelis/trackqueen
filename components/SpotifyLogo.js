import React from "react"
import { Pressable } from "react-native"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"
import { useAssets } from "expo-asset"

// Paper
import { useTheme } from "react-native-paper"

function SpotifyLogo() {
  const { dark } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/spotify/Spotify_Logo_RGB_Black.png"),
    require("../assets/brands/spotify/Spotify_Logo_RGB_White.png"),
  ])
  if (error) {
    console.log(error)
  }

  if (!assets) {
    return null
  }

  return (
    <Pressable
      onPress={() => {
        Linking.openURL("https://open.spotify.com")
      }}
    >
      <Image
        width={2362 / 28}
        height={708 / 28}
        source={dark ? assets[1].localUri : assets[0].localUri}
        style={{ opacity: 0.9 }}
        contentFit={"contain"}
        accessibilityLabel={"Spotify logo"}
      />
    </Pressable>
  )
}

export default SpotifyLogo
