import React from "react"
import { getHeaderTitle } from "@react-navigation/elements"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import PropTypes from "prop-types"

// Paper
import { Appbar, useTheme } from "react-native-paper"

// Custom
import { baseUnit } from "../constants/Base"

const CustomNavigationBar = function ({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name)
  const { colors } = useTheme()
  const theme = useTheme()

  return (
    <Appbar.Header mode={"center-aligned"} theme={theme}>
      <Appbar.Action
        icon={() => (
          <Icon
            name={"account"}
            color={colors.onSurface}
            size={baseUnit * 3.5}
          />
        )}
        onPress={() => {
          navigation.navigate("Your recent tracks")
        }}
      />

      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        titleStyle={{ fontSize: 15, fontWeight: 700, color: colors.secondary }}
        title={title}
      />
      <Appbar.Action
        icon={() => (
          <Icon
            name={"waveform"}
            color={colors.onSurface}
            size={baseUnit * 3.5}
          />
        )}
        onPress={() => {
          navigation.navigate("Search nearby audio")
        }}
      />
    </Appbar.Header>
  )
}

CustomNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  options: PropTypes.object,
  back: PropTypes.object,
}

export default CustomNavigationBar
