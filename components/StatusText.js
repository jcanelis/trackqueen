import React from "react"
import { Text } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Design
import { baseUnit, verticalRhythm } from "../constants/Base"

const StatusText = ({ content }) => {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        padding: baseUnit * 2,
        fontSize: baseUnit * 2,
        lineHeight: verticalRhythm * 6,
        fontWeight: 400,
        color: colors.text,
        textAlign: "center",
      }}
    >
      {content}
    </Text>
  )
}

StatusText.propTypes = {
  content: PropTypes.string,
}

export default StatusText
