import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

// Expo
import { SymbolView } from "expo-symbols"

// Design
import { GOLD } from "../constants/Base"

const ToolbarAudioSearch = () => {
  const navigation = useNavigation()

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("Search nearby audio")
        }}
      >
        <SymbolView
          name="waveform"
          color={GOLD}
          SymbolType="monocrhome"
          tintColor={GOLD}
          colors={GOLD}
          style={styles.symbol}
          type="hierarchical"
        />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("ProfileStack")
        }}
      >
        <SymbolView
          name="person"
          color={GOLD}
          SymbolType="monocrhome"
          tintColor={GOLD}
          colors={GOLD}
          style={styles.symbol}
          type="hierarchical"
        />
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  symbol: {
    color: GOLD,
    width: 24,
    height: 24,
    margin: 8,
  },
})

export default ToolbarAudioSearch
