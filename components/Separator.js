import React from "react"
import { View } from "react-native"
import { useTheme } from "react-native-paper"

export default function Separator() {
  const { colors } = useTheme()
  return <View style={{ height: 1, backgroundColor: colors.tertiary }}></View>
}
