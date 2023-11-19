import React from "react"
import { Pressable, Text, View } from "react-native"
import PropTypes from "prop-types"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { verticalRhythm, blurhash, baseUnit } from "../constants/Base"

const Track = ({ artists, coverArt, link, title }) => {
  const { colors } = useTheme()

  return (
    <Pressable
      onPress={() => {
        Linking.openURL(link)
      }}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          paddingTop: verticalRhythm * 4,
          paddingRight: baseUnit * 5,
          paddingBottom: verticalRhythm * 4,
          paddingLeft: baseUnit * 3,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image
        source={coverArt}
        placeholder={blurhash}
        height={baseUnit * 6}
        width={baseUnit * 6}
        transition={250}
        accessibilityLabel={"Album cover art"}
      />
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: baseUnit * 2,
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            fontSize: 19,
            lineHeight: baseUnit * 3,
            fontWeight: 500,
            color: colors.tertiary,
          }}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode={"middle"}
          style={{
            fontSize: 14,
            lineHeight: baseUnit * 3,
            fontWeight: 500,
            color: colors.tertiary,
            opacity: 0.65,
          }}
        >
          {artists.map((artist, index) => {
            const text = index > 0 ? `, ${artist.name}` : artist.name
            return text
          })}
        </Text>
      </View>
    </Pressable>
  )
}

Track.propTypes = {
  artists: PropTypes.array,
  link: PropTypes.string,
  title: PropTypes.string,
  coverArt: PropTypes.string,
}

export default Track
