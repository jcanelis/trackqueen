import React from "react"
import { Pressable, Text } from "react-native"
import PropTypes from "prop-types"

// Paper
import { useTheme, Chip as Chipper } from "react-native-paper"

// Design
import { baseUnit, GOLD } from "../constants/Base"

const Chip = ({ text, action }) => {
  const { colors } = useTheme()
  return (
    <Chipper
      mode={"flat"}
      compact={false}
      rippleColor={colors.primary}
      textStyle={{ padding: baseUnit * 1 }}
      onPress={() => {
        action()
      }}
    >
      {text}
    </Chipper>
  )
}

Chip.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
}

export default Chip
