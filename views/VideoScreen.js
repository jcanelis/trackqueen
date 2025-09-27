import React, { useEffect, useContext, useRef, useState } from "react"
import { AppState, RefreshControl, ScrollView } from "react-native"
import { useQuery, useQueryClient } from "@tanstack/react-query"

// React Navigation
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from "@react-navigation/native"

// Context
import SpotifyContext from "../context/spotify"
import VideoScreenModel from "../models/videoScreenModel"

// Services
import SpotifyCurrentTrack from "../services/Spotify/getCurrentTrack"
import TokenCheck from "../services/Custom/checkToken"

// Components
import Header from "../components/Header"
import Loader from "../components/Loader"
import YouTubeList from "../components/YouTubeList"

// Design
import { baseUnit, lightGrey } from "../constants/Base"

function VideoScreen() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext

  // State
  let [refreshing, setRefreshing] = useState(false)

  // Ref
  const ref = useRef(null)
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollTo({ y: 0 }),
    })
  )

  // AppState listener
  // https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Query
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
      console.log(appStateVisible, "appStateVisible")
      console.error("Error on query for LoadingScreen", error)
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
    [`${currentlyPlaying.track}-videos`],
    async () => await VideoScreenModel(currentlyPlaying)
  )

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  return (
    <ScrollView
      ref={ref}
      automaticallyAdjustsScrollIndicatorInsets={true}
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior={"automatic"}
      contentInset={{ bottom: baseUnit * 16 }}
      scrollsToTop={true}
      scrollToOverflowEnabled={true}
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
      <Header
        border={false}
        buttonTitle={"View all"}
        type={"youtube"}
        copy={"Live"}
        func={() => {
          navigation.navigate(`${currentlyPlaying.track} YouTube videos`, {
            title: `${currentlyPlaying.track} by ${currentlyPlaying.artist} live`,
            videos: data.performances,
            token: data.nextPageToken,
            query: `${currentlyPlaying.track} ${currentlyPlaying.artist} live`,
          })
        }}
      />

      <YouTubeList fullWidth={false} videos={data.performances} />

      <Header
        border={true}
        buttonTitle={"View all"}
        type={"youtube"}
        copy={"Interviews"}
        func={() => {
          navigation.navigate(`${currentlyPlaying.track} YouTube videos`, {
            title: `${currentlyPlaying.artist} interviews`,
            videos: data.interviews,
            token: data.nextPageToken,
            query: `${currentlyPlaying.artist} interviews`,
          })
        }}
      />

      <YouTubeList fullWidth={false} videos={data.interviews} />

      <Header
        border={true}
        buttonTitle={"View all"}
        type={"youtube"}
        copy={"Reactions"}
        func={() => {
          navigation.navigate(`${currentlyPlaying.track} YouTube videos`, {
            title: `Reactions to ${currentlyPlaying.track} by ${currentlyPlaying.artist}`,
            videos: data.reactions,
            token: data.nextPageToken,
            query: `${currentlyPlaying.track} ${currentlyPlaying.artist} reactions`,
          })
        }}
      />

      <YouTubeList fullWidth={false} videos={data.reactions} />
    </ScrollView>
  )
}

export default VideoScreen
