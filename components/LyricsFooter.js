import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"

// Expo
import { useAssets } from "expo-asset"
import * as WebBrowser from "expo-web-browser"

// Paper
import { Button, useTheme, Text } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

// Components
import Musixmatch from "./Musixmatch"

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url)
}

const LyricsFooter = ({ data }) => {
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
        padding: baseUnit * 3,
        paddingTop: baseUnit * 3,
        paddingBottom: baseUnit * 3,
        textAlign: "left",
        backgroundColor: "rgba(184, 155, 128, 0.2)",
        borderRadius: baseUnit * 2,
        gap: baseUnit * 3,
      }}
    >
      <Text
        variant="labelLarge"
        style={{
          color: colors.tertiary,
        }}
      >
        {"Where are the rest of the lyrics?"}
      </Text>

      <Text
        variant="bodyLarge"
        style={{
          color: colors.tertiary,
          opacity: 0.65,
        }}
      >
        {
          "Displaying lyrics requires a license. We are in contact with Musixmatch to obtain full lyrics access with proper licensing coverage."
        }
      </Text>

      <Musixmatch data={data} />
    </View>
  )
}

LyricsFooter.propTypes = {
  data: PropTypes.object,
}

export default LyricsFooter
