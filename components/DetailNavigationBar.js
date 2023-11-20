import React from "react"
import { getHeaderTitle } from "@react-navigation/elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// Paper
import { Appbar, useTheme } from "react-native-paper"

// Custom
import { blurhash, baseUnit } from "../constants/Base"

export default function DetailNavigationBar({
  navigation,
  route,
  options,
  back,
}) {
  const title = getHeaderTitle(options, route.name)
  const { colors } = useTheme()
  const theme = useTheme()

  return (
    <Appbar.Header mode={"center-aligned"} theme={theme}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}
