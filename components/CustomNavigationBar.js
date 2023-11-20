import React from "react"
import { getHeaderTitle } from "@react-navigation/elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// Paper
import { Appbar, useTheme } from "react-native-paper"

// Custom
import { blurhash, baseUnit } from "../constants/Base"

export default function CustomNavigationBar({
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
      <Appbar.Action
        icon={() => (
          <Icon name={"account"} color={colors.primary} size={baseUnit * 3.4} />
        )}
        onPress={() => {
          navigation.navigate("Your recent tracks")
        }}
      />

      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        titleStyle={{ fontSize: 16, fontWeight: 500, color: colors.tertiary }}
        title={title}
      />
      <Appbar.Action
        icon={() => (
          <Icon
            name={"waveform"}
            color={colors.primary}
            size={baseUnit * 3.4}
          />
        )}
        onPress={() => {
          navigation.navigate("Search nearby audio")
        }}
      />
    </Appbar.Header>
  )
}
