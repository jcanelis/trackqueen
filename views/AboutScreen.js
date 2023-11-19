import React, { useEffect, useContext, useRef, useState } from "react"
import {
  AppState,
  Button,
  RefreshControl,
  ScrollView,
  View,
} from "react-native"

// React Navigation
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from "@react-navigation/native"

// Data Fetching
import { useQuery, useQueryClient } from "@tanstack/react-query"
import AboutScreenModel from "../models/aboutScreenModel"

// Services
import SpotifyCurrentTrack from "../services/Spotify/getCurrentTrack"
import TokenCheck from "../services/Custom/checkToken"

// Context
import SpotifyContext from "../context/spotify"

// Components
import AlbumCover from "../components/AlbumCover"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import SpotifyLogo from "../components/SpotifyLogo"

// Design
import { baseUnit, GOLD, lightGrey } from "../constants/Base"

function AboutScreen() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  // AppState listener: https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext

  // State
  let [refreshing, setRefreshing] = useState(false)

  // Scroll
  const ref = useRef(null)
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollTo({ y: -143 }),
    })
  )

  // Check current track function
  useQuery({
    queryKey: ["Check-current-track"],
    queryFn: async ({ signal }) => {
      return new Promise((resolve, reject) => {
        async function init() {
          try {
            let authToken = await TokenCheck(signal)
            let spotifyData = await SpotifyCurrentTrack(authToken, signal)
            resolve(spotifyData)
          } catch (error) {
            console.error(
              "Error on query Check-current-track in AboutScreen",
              error
            )
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
      console.error("Error on query for AboutScreen", error)
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
    [`${currentlyPlaying.track}-about`],
    async () => await AboutScreenModel(currentlyPlaying, spotifyContext)
  )

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{
        padding: baseUnit * 3,
        gap: baseUnit * 3,
      }}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
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
    >
      <AlbumCover data={data} />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SpotifyLogo />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: baseUnit,
          }}
        >
          <Button
            title="Credits"
            color={GOLD}
            onPress={() => {
              const creditsData = {
                performers: data.artists,
                writers: data.writers,
                producers: data.producers,
                label: data.spotifyAlbumData.label,
              }
              navigation.navigate("Credits", {
                data: creditsData,
              })
            }}
          />

          <Button
            title="ChatGPT"
            color={GOLD}
            onPress={() => {
              navigation.navigate("Ask ChatGPT")
            }}
          />
        </View>
      </View>

      <Notes data={data} />
    </ScrollView>
  )
}

export default AboutScreen
