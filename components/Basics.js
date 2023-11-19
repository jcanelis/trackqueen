import React from "react"
import { Text, View } from "react-native"
import { useTheme } from "react-native-paper"
import PropTypes from "prop-types"

// Design
import { baseUnit } from "../constants/Base"

export function Wrapper({ children }) {
  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: baseUnit * 6,
        paddingRight: baseUnit * 2,
        paddingBottom: baseUnit * 6,
        paddingLeft: baseUnit * 2,
      }}
    >
      {children}
    </View>
  )
}

Wrapper.propTypes = {
  children: PropTypes.array,
}

export function Heading({ children }) {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        fontSize: baseUnit * 3.4,
        lineHeight: baseUnit * 5,
        fontWeight: 600,
        color: colors.tertiary,
      }}
    >
      {children}
    </Text>
  )
}

Heading.propTypes = {
  children: PropTypes.string,
}

export function SubHeading({ children }) {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        fontSize: baseUnit * 2,
        lineHeight: baseUnit * 3,
        fontWeight: 600,
        color: colors.tertiary,
        opacity: 0.7,
      }}
    >
      {children}
    </Text>
  )
}

SubHeading.propTypes = {
  children: PropTypes.string,
}
