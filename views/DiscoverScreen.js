import React, { useEffect, useContext, useRef, useState } from "react"
import { AppState, FlatList, RefreshControl, View } from "react-native"

// React Navigation
import { useNavigation, useScrollToTop } from "@react-navigation/native"

// Paper
import { useTheme } from "react-native-paper"

// Data Fetching
import { useQuery, useQueryClient } from "@tanstack/react-query"
import DiscoverScreenModel from "../models/discoverScreenModel"

// Context
import SpotifyContext from "../context/spotify"

// Services
import SpotifyCurrentTrack from "../services/Spotify/getCurrentTrack"
import TokenCheck from "../services/Custom/checkToken"

// Components
import ArtistList from "../components/ArtistList"
import Chip from "../components/Chip"
import Header from "../components/Header"
import Loader from "../components/Loader"
import Track from "../components/Track"

// Design
import { baseUnit } from "../constants/Base"

function DiscoverScreen() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying
  // const album = currentlyPlaying.spotifyData.album.name

  // AppState listener
  // https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // State
  let [refreshing, setRefreshing] = useState(false)

  // Ref
  const ref = useRef(null)
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollToOffset({ offset: -143 }),
    })
  )

  // Check current track function
  useQuery({
    queryKey: ["Check-current-track"],
    queryFn: async ({ signal }) => {
      return new Promise((resolve, reject) => {
        async function init() {
          try {
            // Get Spotify token
            let authToken = await TokenCheck(signal)

            // Check current track
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
      console.error("Error on query for DiscoverScreen", error)
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
    [`${currentlyPlaying.track}-discover`],
    async () => await DiscoverScreenModel(currentlyPlaying)
  )

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  // Show only a few artists in this initial view
  // Take a copy of the array and shorten
  let initialRelatedArtists = [...data.relatedArtists].splice(0, 5)

  return (
    <FlatList
      ref={ref}
      contentContainerStyle={{ paddingBottom: baseUnit * 8 }}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      ListHeaderComponent={
        <>
          <Header
            border={false}
            type={"spotify"}
            copy={"Similar artists"}
            buttonTitle={"View all"}
            func={() => {
              navigation.navigate(`Similar to ${currentlyPlaying.artist}`, {
                artists: data.relatedArtists,
              })
            }}
          />
          <ArtistList data={initialRelatedArtists} direction={"horizontal"} />

          <Header
            border={true}
            type={"gpt"}
            copy={"Ask ChatGPT"}
            buttonTitle={"View all"}
            func={() => {
              navigation.navigate("Ask ChatGPT")
            }}
          />

          <View
            style={{
              paddingLeft: baseUnit * 3,
              paddingRight: baseUnit * 3,
              gap: baseUnit * 3,
            }}
          >
            <Chip
              text={`Tell me more about this song.`}
              action={() => {
                navigation.navigate("Powered by GPT-4 API", {
                  query: `Tell me about the song, ”${track}” by ${artist}.`,
                })
              }}
            />

            <Chip
              text={`Tell me about ${artist}.`}
              action={() => {
                navigation.navigate("Powered by GPT-4 API", {
                  query: `Tell me about the musician, ${artist}.`,
                })
              }}
            />
          </View>

          <Header
            border={true}
            type={"spotify"}
            copy={"Similar tracks"}
            buttonTitle={"View all"}
            func={() => {
              navigation.navigate(
                `${currentlyPlaying.track} TracksListScreen`,
                {
                  title: `Similar tracks to ${currentlyPlaying.track}`,
                  tracks: data.relatedTracks,
                }
              )
            }}
          />
        </>
      }
      ListFooterComponent={
        <>
          <Header
            border={true}
            type={"spotify"}
            copy={"Popular tracks"}
            buttonTitle={"View all"}
            func={() => {
              navigation.navigate(
                `${currentlyPlaying.track} TracksListScreen`,
                {
                  title: `Popular tracks by ${currentlyPlaying.artist}`,
                  tracks: data.artistTopTracks,
                }
              )
            }}
          />

          {data.artistTopTracks.map((item, index) => {
            if (index < 3) {
              return (
                <View key={index}>
                  <Track
                    key={item.id}
                    artists={item.artists}
                    coverArt={item.album.images[2].url}
                    title={item.name}
                    link={item.external_urls.spotify}
                  />
                </View>
              )
            }
          })}
        </>
      }
      refreshControl={
        <RefreshControl
          title="Checking your current Spotify track..."
          tintColor={colors.primary}
          titleColor={colors.primary}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true)
            queryClient.fetchQuery({
              queryKey: ["Check-current-track"],
            })
          }}
        />
      }
      data={data.relatedTracks}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        if (index < 3) {
          return (
            <View key={index}>
              <Track
                key={item.id}
                artists={item.artists}
                coverArt={item.album.images[2].url}
                title={item.name}
                link={item.external_urls.spotify}
              />
            </View>
          )
        }
      }}
    />
  )
}

export default DiscoverScreen
