import React from "react"
import { Pressable, useWindowDimensions, View } from "react-native"

// React Native Reanimated
// https://docs.swmansion.com/react-native-reanimated/
import Animated, {
  BounceIn,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated"

// Expo
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

export default function Spinner() {
  const { width } = useWindowDimensions()
  const [assets, error] = useAssets([require("../assets/loader.png")])
  const randomWidth = useSharedValue(width / 1.2)
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  }

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
      height: withTiming(randomWidth.value, config),
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
        entering={BounceIn.easing(Easing.bezier(0.2, 0.01, 0, 1))}
        style={[
          {
            width: width / 1.2,
            height: width / 1.2,
          },
          style,
        ]}
      >
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            function getRandomInt(min, max) {
              // Value needs to keep the size smaller than the screen
              // Value also needs to be large enough for a user tap
              min = Math.ceil(min)
              max = Math.floor(max)
              return Math.floor(Math.random() * (max - min) + min)
            }

            randomWidth.value = getRandomInt(88, width - 64)
          }}
        >
          <Image
            style={{ width: width / 2, height: width / 2 }}
            source={assets[0].localUri}
          />
        </Pressable>
      </Animated.View>
    </View>
  )
}
