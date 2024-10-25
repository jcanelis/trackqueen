import React from "react"
import { Pressable } from "react-native"
import { useTheme } from "@react-navigation/native"
import { Image } from "expo-image"

// Expo
import * as Linking from "expo-linking"
import { useAssets } from "expo-asset"

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
        Linking.openURL("https://open.spotify.com/collection/tracks")
      }}
    >
      <Image
        source={dark ? assets[1].localUri : assets[0].localUri}
        width={2362 / 28}
        height={708 / 28}
        style={{ opacity: 0.9 }}
        contentFit={"contain"}
        accessibilityLabel={"Spotify logo"}
      />
    </Pressable>
  )
}

export default SpotifyLogo
