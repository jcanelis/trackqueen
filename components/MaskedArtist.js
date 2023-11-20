import React from "react"
import { Text, View } from "react-native"
import MaskedView from "@react-native-masked-view/masked-view"
import PropTypes from "prop-types"

// Expo
import { Image } from "expo-image"

// Custom
import { baseUnit } from "../constants/Base"

const MaskedArtist = ({ image, artist }) => {
  return (
    <MaskedView
      style={{
        margin: baseUnit * 3,
        height: baseUnit * 16,
      }}
      maskElement={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              textAlign: "center",
              alignSelf: "center",
              fontSize: baseUnit * 7,
              lineHeight: baseUnit * 8,
              fontWeight: "900",
            }}
          >
            {artist}
          </Text>
        </View>
      }
    >
      <Image source={image} style={{ flex: 1 }} />
    </MaskedView>
  )
}

MaskedArtist.propTypes = {
  artist: PropTypes.string,
  image: PropTypes.string,
}

export default MaskedArtist
