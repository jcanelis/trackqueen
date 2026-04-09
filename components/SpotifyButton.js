import React from "react"
import PropTypes from "prop-types"

import { Button, Host, Text } from "@expo/ui/swift-ui"

import {
  buttonStyle,
  controlSize,
  tint,
  fixedSize,
} from "@expo/ui/swift-ui/modifiers"

// Design
import { GOLD } from "../constants/Base"

export default function SpotifyButton({ func, text }) {
  return (
    <Host matchContents>
      <Button
        onPress={() => func()}
        role="default"
        label={text}
        modifiers={[
          controlSize("extraLarge"),
          buttonStyle("glassProminent"),
          tint(GOLD),
          fixedSize({
            horizontal: true,
            vertical: true,
          }),
        ]}
      >
        <Text>{text}</Text>
      </Button>
    </Host>
  )
}

SpotifyButton.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
}
