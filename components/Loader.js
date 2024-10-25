import React, { useEffect } from "react"
import { Text, useWindowDimensions, View } from "react-native"
import { useTheme } from "@react-navigation/native"

// Expo
import { useAssets } from "expo-asset"

// React Native Reanimated
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
} from "react-native-reanimated"

// Design
import { baseUnit } from "../constants/Base"

export default function Loader() {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()
  const [assets, error] = useAssets([require("../assets/loader.png")])

  // Setup animation
  const translateX = useSharedValue(0)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(720, {
        duration: 4000,
      }),
      0,
      true
    )
  }, [translateX])

  // Dynamic style for animated view
  const style = useAnimatedStyle(() => {
    return {
      width: 240,
      height: 240,
      transform: [{ rotate: `${translateX.value}deg` }],
    }
  })

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
        gap: baseUnit * 3,
        backgroundColor: colors.background,
      }}
    >
      <Animated.View
        style={{
          width: width / 2,
          height: width / 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Image style={style} source={{ uri: assets[0].localUri }} />
      </Animated.View>

      <Text style={{ textAlign: "center", color: colors.text, opacity: 0.75 }}>
        Loading content...
      </Text>
    </View>
  )
}
