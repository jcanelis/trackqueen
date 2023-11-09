import React from "react"
import { Pressable, useWindowDimensions } from "react-native"
import * as Linking from "expo-linking"
import { Image } from "expo-image"
import PropTypes from "prop-types"

// Design
import { blurhash, baseUnit } from "../constants/Base"

const VideoThumbnail = ({ data }) => {
  const { width } = useWindowDimensions()
  const { coverArt, url } = data

  return (
    <Pressable
      onPress={() => {
        Linking.openURL(url)
      }}
      style={({ pressed }) => [
        {
          marginTop: baseUnit * 4,
          marginRight: baseUnit * 3,
          marginBottom: 0,
          marginLeft: baseUnit * 3,
          borderRadius: baseUnit * 2,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image
        source={coverArt}
        placeholder={blurhash}
        transition={250}
        width={width - baseUnit * 6}
        height={width * 0.49}
        style={{ borderRadius: baseUnit * 2 }}
        accessibilityLabel={"Music video thumbnail"}
      />
    </Pressable>
  )
}

VideoThumbnail.propTypes = {
  data: PropTypes.object,
}

export default VideoThumbnail
