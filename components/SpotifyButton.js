import React from "react"
import { Pressable, Text, View } from "react-native"
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
      onPress={() => Linking.openURL("https://open.spotify.com")}
    >
      Open Spotify
    </Button>
  )
}

SpotifyButton.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
}
