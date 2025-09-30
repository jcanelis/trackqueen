import React from "react"
import { Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Design
import { GOLD } from "../constants/Base"

const ToolbarAudioSearch = () => {
  const navigation = useNavigation()

  return (
    <Button
      title="Search"
      color={GOLD}
      onPress={() => {
        navigation.navigate("Search nearby audio")
      }}
    />
  )
}

export default ToolbarAudioSearch
