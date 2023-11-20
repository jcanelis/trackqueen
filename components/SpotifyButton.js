import React from "react"
import PropTypes from "prop-types"

// Paper
import { Button, useTheme } from "react-native-paper"

export default function SpotifyButton({ func, text }) {
  const { colors } = useTheme()
  return (
    <Button
      icon={"spotify"}
      mode={"outlined"}
      accessibilityLabel={"Open Spotify"}
      textColor={colors.onSecondaryContainer}
      rippleColor={colors.tertiary}
      onPress={() => func()}
    >
      {text}
    </Button>
  )
}

SpotifyButton.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
}
