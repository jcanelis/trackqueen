import React, { useEffect } from "react"
import { Pressable, View } from "react-native"

// React Native Reanimated
// https://docs.swmansion.com/react-native-reanimated/
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated"

// Expo
import { useAssets } from "expo-asset"

export default function Spinner() {
  // const { width } = useWindowDimensions()
  const [assets, error] = useAssets([require("../assets/loader.png")])

  // Timing and easing config
  // const config = {
  //   duration: 4000,
  //   easing: Easing.bezier(0.5, 0.01, 0, 1),
  // }

  const translateX = useSharedValue(0)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(720, {
        duration: 13000,
      }),
      0,
      true
    )
  }, [translateX])

  // Style object
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable>
          <Animated.Image style={style} source={{ uri: assets[0].localUri }} />
        </Pressable>
      </Animated.View>
    </View>
  )
}
