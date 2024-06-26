import React from "react"
import { Button, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

// Design
import { baseUnit, GOLD } from "../constants/Base"

function Header({ copy, func, type, buttonTitle, border }) {
  const { dark, colors } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/spotify/Spotify_Icon_RGB_Black.png"),
    require("../assets/brands/spotify/Spotify_Icon_RGB_White.png"),
    require("../assets/brands/youtube/youtube_dark.png"),
    require("../assets/brands/youtube/youtube_red.png"),
    require("../assets/brands/openai/PNGs/openai-white-logomark.png"),
  ])

  if (error) {
    console.log(error)
  }

  if (!assets) {
    return null
  }

  let activeAssets
  let dimensions

  if (type == "spotify") {
    activeAssets = [assets[0], assets[1]]
    dimensions = { height: baseUnit * 3, width: baseUnit * 3 }
  }

  if (type == "youtube") {
    activeAssets = [assets[2], assets[3]]
    dimensions = { height: 45 / 2.4, width: 64 / 2.4 }
  }

  if (type == "gpt") {
    activeAssets = [assets[4], assets[4]]
    dimensions = { height: 600 / 24, width: 600 / 24 }
  }

  return (
    <View style={{ marginTop: baseUnit * 1 }}>
      {border && (
        <View
          style={{
            height: 1,
            marginTop: baseUnit * 2,
            marginRight: baseUnit * 3,
            marginBottom: baseUnit * 2,
            marginLeft: baseUnit * 3,
            backgroundColor: colors.border,
          }}
        ></View>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: baseUnit * 2,
          marginLeft: baseUnit * 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{ marginRight: baseUnit }}
            source={dark ? activeAssets[1].localUri : activeAssets[0].localUri}
            width={dimensions.width}
            height={dimensions.height}
          />

          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{
              fontSize: baseUnit * 2.8,
              lineHeight: baseUnit * 3,
              color: colors.text,
              fontWeight: 700,
            }}
          >
            {copy}
          </Text>
        </View>

        {func && (
          <Button title={buttonTitle} color={GOLD} onPress={() => func()} />
        )}
      </View>
    </View>
  )
}

Header.propTypes = {
  buttonTitle: PropTypes.string,
  type: PropTypes.string,
  copy: PropTypes.string,
  border: PropTypes.bool,
  func: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
}

export default Header
