import React from "react"
import PropTypes from "prop-types"

// Paper
import { Chip as Chipper } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

const Chip = ({ text, action }) => {
  return (
    <Chipper
      mode={"flat"}
      ellipsizeMode={"tail"}
      compact={false}
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
