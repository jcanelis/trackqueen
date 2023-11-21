import React from "react"
import { Pressable, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

// Design
import { baseUnit } from "../constants/Base"

export default function SpotifyButton({ func, text }) {
  const { dark, colors } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/spotify/Spotify_Icon_RGB_White.png"),
  ])
  if (error) {
    console.log(error)
  }

  return (
    <>
      {assets && (
        <View style={{ alignItems: "center" }}>
          <Pressable
            onPress={() => func()}
            style={({ pressed }) => [
              {
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: baseUnit * 2,
                marginBottom: baseUnit * 2,
                padding: baseUnit * 2,
                height: baseUnit * 7,
                borderWidth: dark ? 1 : 0,
                borderColor: colors.border,
                backgroundColor: dark ? "transparent" : colors.text,
                borderRadius: baseUnit * 7,
                opacity: pressed ? 0.7 : 1,
                shadowOffset: { width: 3, height: 3 },
                shadowColor: "#555",
                shadowOpacity: dark ? 0 : 0.3,
                shadowRadius: 5,
              },
            ]}
          >
            <Image
              style={{ marginRight: baseUnit * 2 }}
              width={baseUnit * 4}
              height={baseUnit * 4}
              source={assets[0].localUri}
            />
            <Text
              style={{
                fontSize: baseUnit * 1.9,
                lineHeight: baseUnit * 3,
                fontWeight: 600,
                color: dark ? colors.text : colors.background,
              }}
            >
              {text}
            </Text>
          </Pressable>
        </View>
      )}
    </>
  )
}

SpotifyButton.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
}
