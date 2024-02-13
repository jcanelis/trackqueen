import React from "react"
import { Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Design
import { Ionicons } from "@expo/vector-icons"
import { baseUnit, GOLD } from "../constants/Base"

const ToolbarAudioSearch = () => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Search nearby audio")
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
      ]}
    >
      <Ionicons name={"pulse-outline"} color={GOLD} size={baseUnit * 3.4} />
    </Pressable>
  )
}

export default ToolbarAudioSearch
