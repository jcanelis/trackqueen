import React, { useContext } from "react"
import { Pressable, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { Image } from "expo-image"

// Context
import SpotifyContext from "../context/spotify"

// Design
import { blurhash, baseUnit } from "../constants/Base"

export default function AlbumCover({ data }) {
  const { width } = useWindowDimensions()
  const { currentlyPlaying } = useContext(SpotifyContext)
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(currentlyPlaying.spotifyData.album.name, {
          tracks: data.spotifyAlbumData.tracks.items,
          albumImage: data.spotifyAlbumData.images[0].url,
        })
      }}
      style={({ pressed }) => [
        {
          marginTop: baseUnit,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Image
        source={data.spotifyAlbumData.images[0].url}
        placeholder={blurhash}
        transition={250}
        width={width - baseUnit * 6}
        height={width - baseUnit * 6}
        contentFit={"contain"}
        accessibilityLabel={currentlyPlaying.spotifyData.album.name}
      />
    </Pressable>
  )
}

AlbumCover.propTypes = {
  data: PropTypes.object,
}
