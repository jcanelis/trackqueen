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
  Easing,
  cancelAnimation,
} from "react-native-reanimated"

// Design
import { baseUnit } from "../constants/Base"

export default function Loader() {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()
  const [assets, error] = useAssets([require("../assets/loader.png")])

  // Setup animation
  const rotation = useSharedValue(0)
  const scaleAnim = useSharedValue(0.35)

  useEffect(() => {
    // Use a large target value with linear easing to simulate infinite clockwise
    // rotation without ever resetting to 0 (which causes counter-clockwise jumps).
    // 360 * 10000 = 3,600,000 degrees — effectively infinite at 3s per rotation.
    rotation.value = withTiming(360 * 10000, {
      duration: 1500 * 10000,
      easing: Easing.linear,
    })

    scaleAnim.value = withRepeat(
      withTiming(0.5, {
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    )

    return () => {
      cancelAnimation(rotation)
      cancelAnimation(scaleAnim)
    }
  }, [rotation, scaleAnim])

  // Dynamic style for animated view
  const style = useAnimatedStyle(() => {
    return {
      width: 240,
      height: 240,
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scaleAnim.value }],
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

      <Text style={{ textAlign: "center", color: colors.text, opacity: 0.85 }}>
        Loading content...
      </Text>
    </View>
  )
}
