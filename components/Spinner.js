import React, { useEffect } from "react"
import { Pressable, View } from "react-native"

// React Native Reanimated
// https://docs.swmansion.com/react-native-reanimated/
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from "react-native-reanimated"

// Expo
import { useAssets } from "expo-asset"

export default function Spinner() {
  const [assets, error] = useAssets([require("../assets/loader.png")])

  const rotation = useSharedValue(0)
  const scaleAnim = useSharedValue(0.7)

  useEffect(() => {
    rotation.value = withTiming(360 * 10000, {
      duration: 3375 * 10000,
      easing: Easing.linear,
    })

    scaleAnim.value = withRepeat(
      withTiming(0.8, {
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

  // Style object
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
