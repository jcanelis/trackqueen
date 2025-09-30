import React from "react"
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Design
import { GOLD } from "../constants/Base"

const ToolbarProfile = () => {
  const navigation = useNavigation()

  return (
    <Button
      title="Profile"
      color={GOLD}
      onPress={() => {
        navigation.navigate("ProfileStack")
      }}
    />
  )
}

export default ToolbarProfile
