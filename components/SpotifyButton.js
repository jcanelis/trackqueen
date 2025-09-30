import React from "react"
import PropTypes from "prop-types"

// Expo
import { Button, Host } from "@expo/ui/swift-ui"

// Design
import { baseUnit } from "../constants/Base"

export default function SpotifyButton({ func, text }) {
  return (
    <Host style={{ padding: baseUnit * 4 }}>
      <Button
        variant="glassProminent"
        color={"rgba(50,50,50,1)"}
        controlSize="regular"
        style={{ width: 240 }}
        onPress={() => func()}
      >
        {text}
      </Button>
    </Host>
  )
}

SpotifyButton.propTypes = {
  func: PropTypes.func,
  text: PropTypes.string,
}
