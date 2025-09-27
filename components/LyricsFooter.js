import React from "react"
import { Button, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { Image } from "expo-image"
import { useAssets } from "expo-asset"
import * as WebBrowser from "expo-web-browser"

// Design
import { baseUnit, blurhash, GOLD } from "../constants/Base"

// Components
import Musixmatch from "./Musixmatch"

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url)
}

const LyricsFooter = ({ data, hasLyrics }) => {
  const { colors } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/musixmatch/Type_Extended_Black.png"),
    require("../assets/brands/musixmatch/Type_Extended_White.png"),
  ])

  if (!assets || error) {
    return null
  }

  return (
    <View
      style={{
        marginTop: baseUnit * 3,
        alignItems: "center",
        gap: baseUnit * 3,
      }}
    >
      {hasLyrics && (
        <View>
          <Musixmatch data={data} />
          <Image
            accessibilityLabel={"Muixmatch pixel tracking"}
            source={data.lyricsData.message.body.lyrics.pixel_tracking_url}
            height={1}
            width={1}
            style={{ opacity: 0 }}
            placeholder={blurhash}
          />
        </View>
      )}
    </View>
  )
}

LyricsFooter.propTypes = {
  data: PropTypes.object,
  hasLyrics: PropTypes.bool,
}

export default LyricsFooter
