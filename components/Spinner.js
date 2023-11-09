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

// Lottie React Native
// https://github.com/lottie-react-native/lottie-react-native
import LottieView from "lottie-react-native"

export default function Spinner() {
  const { width } = useWindowDimensions()
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
            flex: 1,
            width: width / 1.2,
            height: width / 1.2,
          },
          style,
        ]}
      >
        <Pressable
          style={{
            flex: 1,
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
          <LottieView
            source={require("../assets/animation.json")}
            style={{ flex: 1 }}
            autoPlay={true}
            loop={true}
          />
        </Pressable>
      </Animated.View>
    </View>
  )
}
