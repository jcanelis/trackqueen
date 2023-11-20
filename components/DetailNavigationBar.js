import React from "react"
import { getHeaderTitle } from "@react-navigation/elements"
import PropTypes from "prop-types"
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// Paper
import { Appbar, useTheme } from "react-native-paper"

const DetailNavigationBar = function ({ navigation, route, options, back }) {
  const title = getHeaderTitle(options, route.name)

  const theme = useTheme()

  return (
    <Appbar.Header mode={"center-aligned"} theme={theme}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  )
}

DetailNavigationBar.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  options: PropTypes.object,
  back: PropTypes.func,
}

export default DetailNavigationBar
