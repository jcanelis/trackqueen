import React, { useContext } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import PropTypes from "prop-types"

// React Navigation
import { useNavigation } from "@react-navigation/native"

// Expo
import * as Linking from "expo-linking"

// Context
import SpotifyContext from "../../context/spotify"

// Components
import Header from "../../components/Header"
import SpotifyButton from "../../components/SpotifyButton"
import Track from "../../components/Track"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit } from "../../constants/Base"

const AlbumTracks = ({ route }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  // Context
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { artist } = currentlyPlaying
  const album = currentlyPlaying.spotifyData.album.name

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        contentContainerStyle={{ paddingBottom: baseUnit * 6 }}
        estimatedItemSize={20}
        data={route.params.tracks}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <Track
              key={item.id}
              artists={item.artists}
              coverArt={route.params.albumImage}
              title={item.name}
              link={item.external_urls.spotify}
            />
          )
        }}
        refreshing={false}
        ListHeaderComponent={
          <Header
            buttonTitle={"Ask ChatGPT"}
            type={"spotify"}
            copy={`${route.params.tracks.length} tracks`}
            border={false}
            func={() => {
              navigation.navigate("Powered by GPT-4 API", {
                query: `Tell me about the album, ${album} by ${artist}.`,
              })
            }}
          />
        }
        ListFooterComponent={
          <View style={{ margin: baseUnit * 4, alignItems: "center" }}>
            <SpotifyButton
              text={"Play on Spotify"}
              func={() => {
                Linking.openURL(
                  currentlyPlaying.spotifyData.album.external_urls.spotify
                )
              }}
            />
          </View>
        }
      />
    </View>
  )
}

AlbumTracks.propTypes = {
  route: PropTypes.object,
}

export default AlbumTracks
