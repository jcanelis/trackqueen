import React from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Paper
import { useTheme } from "react-native-paper"

// Design
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { baseUnit } from "../constants/Base"

const ToolbarProfile = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProfileStack")
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
      ]}
    >
      <Icon name={"account"} color={colors.primary} size={baseUnit * 3.4} />
    </Pressable>
  )
}

export default ToolbarProfile
