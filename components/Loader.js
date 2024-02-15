import React from "react"
import { View, useWindowDimensions, Text } from "react-native"
import { useTheme } from "@react-navigation/native"

// Expo
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

// Design
import { baseUnit } from "../constants/Base"

export default function Loader() {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()
  const [assets, error] = useAssets([require("../assets/loader.png")])

  if (error) {
    console.log(error)
  }

  if (!assets) {
    return null
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: baseUnit * 2,
        backgroundColor: colors.background,
      }}
    >
      <Image
        style={{ width: width / 2, height: width / 2 }}
        source={assets[0].localUri}
      />
      <Text style={{ textAlign: "center", color: colors.text, opacity: 0.7 }}>
        Loading content...
      </Text>
    </View>
  )
}
