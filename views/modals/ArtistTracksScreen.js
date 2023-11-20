import React, { useEffect } from "react"
import { useWindowDimensions, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import { useQuery } from "@tanstack/react-query"
import PropTypes from "prop-types"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Services
import SpotifyArtistTopTracks from "../../services/Spotify/getArtistsTopTracks"
import TokenCheck from "../../services/Custom/checkToken"

// Components
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import SpotifyButton from "../../components/SpotifyButton"
import Track from "../../components/Track"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { blurhash, baseUnit } from "../../constants/Base"

function ArtistTracksScreen({ route }) {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      title: route.params.item.name,
    })
  }, [navigation, route.params.item.name])

  const { isLoading, isError, data } = useQuery(
    [`${route.params.item.name}-top-tracks`],
    async () => {
      const token = await TokenCheck()
      const { id } = route.params.item
      const { tracks } = await SpotifyArtistTopTracks(token, id)
      const newImage = route.params.coverImage

      return { tracks, newImage }
    }
  )

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        contentContainerStyle={{ paddingBottom: baseUnit * 8 }}
        estimatedItemSize={10}
        ListHeaderComponent={
          <View style={{ flex: 1 }}>
            <Image
              placeholder={blurhash}
              transition={1000}
              source={data.newImage}
              width={width}
              height={width * 1.2}
            />

            <View
              style={{
                paddingTop: baseUnit * 2,
                paddingBottom: baseUnit * 1,
              }}
            >
              <Header
                border={false}
                type={"spotify"}
                copy={"Popular tracks"}
                buttonTitle={"View on Spotify"}
                func={() => {
                  Linking.openURL(route.params.item.external_urls.spotify)
                }}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ margin: baseUnit * 3 }}>
            <SpotifyButton
              text={"Play on Spotify"}
              func={() => {
                Linking.openURL(route.params.item.external_urls.spotify)
              }}
            />
          </View>
        }
        ListEmptyComponent={<Loader />}
        refreshing={false}
        data={data.tracks}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <Track
              artists={item.artists}
              coverArt={item.album.images[2].url}
              link={item.external_urls.spotify}
              title={item.name}
            />
          )
        }}
      />
    </View>
  )
}

ArtistTracksScreen.propTypes = {
  route: PropTypes.object,
}

export default ArtistTracksScreen
