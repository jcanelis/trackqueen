import React from "react"
import { Pressable, Text } from "react-native"
// import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Design
import { baseUnit, GOLD } from "../constants/Base"

const Chip = ({ text, action }) => {
  // Testing alternate colors here.
  // const { colors } = useTheme()

  return (
    <Pressable
      onPress={() => {
        action()
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          borderRadius: baseUnit * 2,
          // borderColor: colors.border,
          borderColor: "rgba(50,50,50,1)",
          // backgroundColor: colors.card,
          backgroundColor: "rgba(20,20,20,1)",
          borderWidth: 1,
        },
      ]}
    >
      <Text
        style={{
          padding: baseUnit * 3,
          fontSize: baseUnit * 2.1,
          lineHeight: baseUnit * 3,
          fontWeight: 500,
          color: GOLD,
          borderRadius: baseUnit * 2,
        }}
      >
        {text}
      </Text>
    </Pressable>
  )
}

Chip.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
}

export default Chip
