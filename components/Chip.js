import React from "react"
import PropTypes from "prop-types"

// Paper
import { useTheme, Chip as Chipper } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

const Chip = ({ text, action }) => {
  const { colors } = useTheme()

  return (
    <Chipper
      mode={"flat"}
      ellipsizeMode={"tail"}
      compact={false}
      style={{ backgroundColor: colors.tertiary }}
      textStyle={{ color: colors.onPrimary, padding: baseUnit * 1 }}
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
