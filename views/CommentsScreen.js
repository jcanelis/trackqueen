import React, { useEffect, useContext, useRef, useState } from "react"
import { AppState, FlatList, Text, RefreshControl, View } from "react-native"

// React Navigation
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from "@react-navigation/native"

// Data Fetching
import { useQuery, useQueryClient } from "@tanstack/react-query"

import YouTubeSearch from "../services/YouTube/getSearch"
import YouTubeComments from "../services/YouTube/getComments"

// Context
import SpotifyContext from "../context/spotify"

// Services
import SpotifyCurrentTrack from "../services/Spotify/getCurrentTrack"
import TokenCheck from "../services/Custom/checkToken"

// Components
import Chip from "../components/Chip"
import Comment from "../components/Comment"
import Header from "../components/Header"
import Loader from "../components/Loader"
import VideoThumbnail from "../components/VideoThumbnail"

// Design
import { baseUnit, lightGrey } from "../constants/Base"

function CommentsScreen() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // Context
  const { currentlyPlaying } = useContext(SpotifyContext)
  const spotifyContext = useContext(SpotifyContext)
  const { track } = currentlyPlaying
  const { artist } = currentlyPlaying

  // AppState listener: https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Refresh control
  let [refreshing, setRefreshing] = useState(false)

  // Save each array of comments
  // let [commentsRelevant, setCommentsRelevant] = useState([])
  // let [commentsRecent, setCommentsRecent] = useState([])

  // Comments to be displayed
  // let [commentsToShow, setCommentsToShow] = useState(commentsRelevant)

  // Comments nextPageToken for new requests
  // let [nextPageTokenRecent, setPageTokenRecent] = useState("")
  // let [nextPageTokenRelevant, setPageTokenRelevant] = useState("")

  // Tab index
  // const [selectedTag, setSelectedTag] = useState(options[0])
  // let [index, setIndex] = useState(0)

  // Scroll reference
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
            let authToken = await TokenCheck(signal)
            let spotifyData = await SpotifyCurrentTrack(authToken, signal)
            resolve(spotifyData)
          } catch (error) {
            console.error(
              "Error on query Check-current-track in CommentsScreen",
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
      console.error("Error on query for CommentsScreen", error)
    },
    onSuccess: (data) => {
      setRefreshing(false)
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

  const { isLoading, isError, data } = useQuery({
    queryKey: [`${currentlyPlaying.track}-comments`],
    queryFn: async () => {
      const video = await YouTubeSearch(1, `${track} ${artist} official`, "");
      const commentsData = await YouTubeComments(video.items[0].id.videoId);

      return {
        video: { 
          url: `https://www.youtube.com/watch?v=${video.items[0].id.videoId}`,
          coverArt: video.items[0].snippet.thumbnails.high.url,
        },
        comments: commentsData.comments,
      }
    },
    refetchOnMount: true,
    keepPreviousData: false,
    enabled: true,
    retry: false,
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error("An error occured in CommentsScreen : ", error)  
    },
  })

  if (isLoading) return <Loader />
  if (isError) return <Loader />

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlatList
        ref={ref}
        automaticallyAdjustsScrollIndicatorInsets={true}
        automaticallyAdjustContentInsets={true}
        contentInset={{ bottom: baseUnit * 6 }}
        contentInsetAdjustmentBehavior={"automatic"}
        style={{ flex: 1 }}
        scrollsToTop={true}
        scrollToOverflowEnabled={true}
        ListHeaderComponent={
          <>
            <VideoThumbnail data={data.video} />
            <Header
              buttonTitle={"Ask ChatGPT"}
              type={"youtube"}
              copy={"Comments"}
              func={() => {
                navigation.navigate("Powered by GPT-5", {
                  query: `What have people said about the song, ”${track}” by ${artist}?`,
                })
              }}
              border={false}
            />
          </>
        }
        data={data.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comment data={item} />}
        ListEmptyComponent={
          <View
            style={{
              gap: baseUnit * 6,
              padding: baseUnit * 3,
            }}
          >
            <Text
              style={{
                marginTop: baseUnit * 2,
                textAlign: "center",
                color: colors.text,
                opacity: 0.7,
              }}
            >
              No comments found for this track.
            </Text>
            <Chip
              text={`Ask ChatGPT about what people have said about ”${track}” by ${artist}.`}
              action={() => {
                navigation.navigate("Powered by GPT-5", {
                  query: `What have people said about the song, ”${track}” by ${artist}?`,
                })
              }}
            />
          </View>
        }
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
      />
    </View>
  )
}

export default CommentsScreen
