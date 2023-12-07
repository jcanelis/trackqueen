import React from "react"
import { Pressable } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { useAssets } from "expo-asset"
import * as WebBrowser from "expo-web-browser"
import { Image } from "expo-image"

// Design
import { baseUnit } from "../constants/Base"

export default function Musixmatch({ data }) {
  const { dark } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/musixmatch/Type_Extended_White.png"),
    require("../assets/brands/musixmatch/Type_Extended_Black.png"),
  ])

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url)
  }

  return (
    <>
      {assets && !error && (
        <Pressable
          onPress={() => {
            _handlePressButtonAsync(data.musixMatchTrack.track_share_url)
          }}
          style={({ pressed }) => [
            {
              marginTop: baseUnit * 2,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Image
            source={dark ? assets[0].localUri : assets[1].localUri}
            height={400 / 11}
            width={1760 / 11}
          />
        </Pressable>
      )}
    </>
  )
}

Musixmatch.propTypes = {
  data: PropTypes.object,
}
