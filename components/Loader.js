import React from "react"
import { View, useWindowDimensions, Text } from "react-native"
import LottieView from "lottie-react-native"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

export default function Loader() {
  const { width } = useWindowDimensions()
  const { colors } = useTheme()

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
      <LottieView
        source={require("../assets/animation.json")}
        style={{ width: width / 1.6, height: width / 1.6 }}
        autoPlay={true}
        loop={true}
      />
      <Text
        style={{ textAlign: "center", color: colors.tertiary, opacity: 0.7 }}
      >
        Loading content...
      </Text>
    </View>
  )
}
