import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"

// Paper
import { useTheme, Text } from "react-native-paper"

// Expo
import { useAssets } from "expo-asset"

// Components
import Musixmatch from "./Musixmatch"

// Design
import { baseUnit } from "../constants/Base"

const LyricsFooter = ({ data }) => {
  const { colors } = useTheme()
  const [assets, error] = useAssets([
    require("../assets/brands/musixmatch/Type_Extended_Black.png"),
    require("../assets/brands/musixmatch/Type_Extended_White.png"),
  ])

  if (!assets || error) {
    return null
  }

  return (
    <View
      style={{
        marginTop: baseUnit,
        marginBottom: baseUnit * 3,
        padding: baseUnit * 3,
        paddingTop: baseUnit * 3,
        paddingBottom: baseUnit * 3,
        textAlign: "left",
        backgroundColor: "rgba(184, 155, 128, 0.2)",
        borderRadius: baseUnit * 2,
        gap: baseUnit * 3,
      }}
    >
      <Text variant={"labelLarge"} style={{ color: colors.tertiary }}>
        {"Where are the rest of the lyrics?"}
      </Text>

      <Text variant="bodyLarge" style={{ color: colors.tertiary }}>
        {
          "Displaying lyrics requires a license. We are in contact with Musixmatch to obtain full lyrics access with proper licensing coverage."
        }
      </Text>

      <Musixmatch data={data} />
    </View>
  )
}

LyricsFooter.propTypes = {
  data: PropTypes.object,
}

export default LyricsFooter
