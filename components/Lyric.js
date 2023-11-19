import React from "react"
import { Text } from "react-native"
import PropTypes from "prop-types"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit, verticalRhythm } from "../constants/Base"

const Lyric = ({ content }) => {
  const { colors } = useTheme()

  return (
    <Text
      style={{
        paddingTop: baseUnit * 2,
        paddingRight: baseUnit * 4,
        paddingBottom: baseUnit * 2,
        paddingLeft: baseUnit * 4,
        fontSize: baseUnit * 2.8,
        lineHeight: verticalRhythm * 8,
        fontWeight: 500,
        color: colors.tertiary,
        opacity: 0.95,
      }}
      selectable={true}
    >
      {content}
    </Text>
  )
}

Lyric.propTypes = {
  content: PropTypes.string,
}

export default Lyric
