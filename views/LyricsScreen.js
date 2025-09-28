import React, { useContext, useEffect, useRef, useState } from "react"
import {
  AppState,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from "react-native"

// React Navigation
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from "@react-navigation/native"

// Expo
import { Image } from "expo-image"

// Data Fetching
import { useQuery, useQueryClient } from "@tanstack/react-query"
import LyricsScreenModel from "../models/lyricsScreenModel"

// Services
import SpotifyCurrentTrack from "../services/Spotify/getCurrentTrack"
import TokenCheck from "../services/Custom/checkToken"

// Context
import SpotifyContext from "../context/spotify"

// Components
import GeniusLink from "../components/GeniusLink"
import Loader from "../components/Loader"
import Lyric from "../components/Lyric"
import LyricsFooter from "../components/LyricsFooter"
import SpotifyLogo from "../components/SpotifyLogo"

// Design
import { baseUnit, blurhash, lightGrey } from "../constants/Base"

function LyricsScreen() {
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // Context
  const { currentlyPlaying } = useContext(SpotifyContext)
  const spotifyContext = useContext(SpotifyContext)

  // State
  let [refreshing, setRefreshing] = useState(false)

  // AppState listener
  // https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Ref
  const ref = useRef(null)
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollToOffset({ offset: 0 }),
    })
  )

  // Check current track function
  useQuery({
    queryKey: ["Check-current-track"],
    queryFn: async ({ signal }) => {
      return new Promise((resolve, reject) => {
        async function init() {
          try {
            // Get token
            let authToken = await TokenCheck(signal)

            // Check track
            let spotifyData = await SpotifyCurrentTrack(authToken, signal)

            resolve(spotifyData)
          } catch (error) {
            reject(error)
          }
        }
        init()
      })
    },
    refetchOnMount: true,
    keepPreviousData: false,
    enabled: false,
    retry: false,
    onError: (error) => {
      console.log(appStateVisible)
      console.error("Error on query for LyricsScreen", error)
    },
    onSuccess: (data) => {
      setRefreshing(false)
      // Update the app
      spotifyContext.updateTrack({
        track: data.name,
        artist: data.artists[0].name,
        spotifyData: data,
      })
    },
  })

  // Cancel query if app is closed
  // Restart query when back
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        queryClient.resetQueries({
          queryKey: ["Check-current-track"],
        })
      } else {
        setRefreshing(false)
        queryClient.cancelQueries({
          queryKey: ["Check-current-track"],
        })
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      setRefreshing(false)
      subscription.remove()
    }
  }, [queryClient])

  const { isLoading, isError, data } = useQuery(
    [`${currentlyPlaying.track}-lyrics`],
    async () => await LyricsScreenModel(currentlyPlaying)
  )

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  return (
    <FlatList
      ref={ref}
      automaticallyAdjustsScrollIndicatorInsets={true}
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior={"automatic"}
      contentInset={{ bottom: baseUnit * 8 }}
      contentContainerStyle={{
        gap: baseUnit,
      }}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      scrollsToTop={true}
      scrollToOverflowEnabled={true}
      data={data.lyrics}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) =>
        item.length > 0 ? <Lyric content={item} /> : null
      }
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          title="Checking your current Spotify track..."
          tintColor={lightGrey}
          titleColor={lightGrey}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            queryClient.fetchQuery({
              queryKey: ["Check-current-track"],
            })
          }}
        />
      }
      ListHeaderComponent={
        <View
          style={{
            gap: baseUnit * 3,
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate(currentlyPlaying.artist, {
                data: data,
                image: data.spotifyArtistData.images[0].url,
                bio: data.bio,
                instagram: data.instagram,
              })
            }}
            style={({ pressed }) => [
              {
                alignItems: "center",
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Image
              source={data.spotifyArtistData.images[0].url}
              placeholder={blurhash}
              transition={250}
              height={width * 0.85}
              width={width}
              accessibilityLabel={currentlyPlaying.artist}
            />
          </Pressable>

          <SpotifyLogo />

          <GeniusLink data={data} />
        </View>
      }
      ListFooterComponent={
        <View style={{ gap: baseUnit * 2 }}>
          <LyricsFooter
            data={data}
            hasLyrics={data.lyrics.length > 0 ? true : false}
          />
        </View>
      }
      ListEmptyComponent={
        <View
          style={{
            alignItems: "center",
            paddingTop: baseUnit * 8,
            paddingBottom: baseUnit * 8,
            textAlign: "center",
          }}
        >
          <Text style={{ color: colors.text, opacity: 0.7 }}>
            No lyrics were found for this track.
          </Text>
        </View>
      }
    />
  )
}

export default LyricsScreen
