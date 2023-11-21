import React from "react"
import PropTypes from "prop-types"
import { View } from "react-native"

// Paper
import { Text } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

const Lyric = ({ content }) => (
  <View
    style={{
      paddingLeft: baseUnit * 3,
      paddingRight: baseUnit * 3,
      paddingTop: baseUnit * 3,
      paddingBottom: baseUnit * 3,
    }}
    selectable={true}
  >
    <Text variant="titleLarge">{content}</Text>
  </View>
)

Lyric.propTypes = {
  content: PropTypes.string,
}

export default Lyric
