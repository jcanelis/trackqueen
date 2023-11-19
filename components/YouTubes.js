import React from "react"
import { Text, Pressable, useWindowDimensions } from "react-native"
import PropTypes from "prop-types"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { blurhash, baseUnit } from "../constants/Base"

export default function YouTubes({ item, fullWidth }) {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()

  return (
    <Pressable
      onPress={() => {
        Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`)
      }}
      style={({ pressed }) => [
        {
          width: fullWidth ? width : width - 80,
          borderRadius: fullWidth ? 0 : baseUnit * 2,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image
        source={item.snippet.thumbnails.high.url}
        placeholder={blurhash}
        transition={250}
        width={fullWidth ? width : width - 80}
        height={fullWidth ? width * 0.525 : width * 0.44}
        style={{ borderRadius: fullWidth ? 0 : baseUnit * 2 }}
        accessibilityLabel={item.snippet.title
          .replace(/&#39;/gi, `'`)
          .replace(/&amp;/gi, `&`)
          .replace(/&quot;/gi, `"`)}
      />

      <Text
        numberOfLines={2}
        style={{
          paddingTop: baseUnit * 2,
          paddingRight: baseUnit * 2,
          paddingBottom: fullWidth ? baseUnit * 3 : 0,
          paddingLeft: fullWidth ? baseUnit * 2 : 0,
          fontSize: baseUnit * 2,
          lineHeight: baseUnit * 2.6,
          fontWeight: 500,
          color: colors.tertiary,
          textAlign: "left",
          opacity: 0.85,
        }}
      >
        {item.snippet.title
          .replace(/&#39;/gi, `'`)
          .replace(/&amp;/gi, `&`)
          .replace(/&quot;/gi, `"`)}
      </Text>
    </Pressable>
  )
}

YouTubes.propTypes = {
  item: PropTypes.object,
  fullWidth: PropTypes.bool,
}
