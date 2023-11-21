import React from "react"
import { Button, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { useAssets } from "expo-asset"
import * as WebBrowser from "expo-web-browser"

// Design
import { baseUnit, GOLD } from "../constants/Base"

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
        <>
          <Button
            title="View all lyrics on Musixmatch"
            color={GOLD}
            onPress={() => {
              _handlePressButtonAsync(data.musixMatchTrack.track_share_url)
            }}
          />

          <View
            style={{
              margin: baseUnit * 3,
              padding: baseUnit * 3,
              paddingTop: baseUnit * 3,
              paddingBottom: baseUnit * 3,
              textAlign: "left",
              backgroundColor: "rgba(184, 155, 128, 0.2)",
              borderRadius: baseUnit * 2,
              gap: baseUnit * 2,
            }}
          >
            <Text
              style={{
                fontSize: baseUnit * 2.2,
                lineHeight: baseUnit * 3,
                fontWeight: 600,
                color: colors.text,
              }}
            >
              Where are the rest of the lyrics?
            </Text>

            <Text
              style={{
                fontSize: baseUnit * 2,
                lineHeight: baseUnit * 3,
                fontWeight: 400,
                color: colors.text,
                opacity: 0.65,
              }}
            >
              Displaying lyrics requires a license. We are in contact with
              Musixmatch to obtain full lyrics access with proper licensing
              coverage.
            </Text>

            <Musixmatch data={data} />
          </View>
        </>
      )}
    </View>
  )
}

LyricsFooter.propTypes = {
  data: PropTypes.object,
  hasLyrics: PropTypes.bool,
}

export default LyricsFooter
