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

  // Comments
  const [allComments, setAllComments] = useState([])
  const [nextPageToken, setNextPageToken] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // AppState listener (https://reactnative.dev/docs/appstate)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // Refresh control
  let [refreshing, setRefreshing] = useState(false)

  // Scroll reference
  const ref = useRef(null)
  useScrollToTop(
    useRef({
      scrollToTop: () => ref.current?.scrollToOffset({ offset: 0 }),
    })
  )

  // Check current track function
  const checkCurrentTrackQuery = useQuery({
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
    enabled: false,
    retry: false,
  })

  useEffect(() => {
    if (checkCurrentTrackQuery.isError) {
      console.error("Error on query for CommentsScreen", checkCurrentTrackQuery.error)
    }
  }, [checkCurrentTrackQuery.isError, checkCurrentTrackQuery.error, appStateVisible])

  useEffect(() => {
    if (checkCurrentTrackQuery.isSuccess && checkCurrentTrackQuery.data) {
      setRefreshing(false)
      spotifyContext.updateTrack({
        track: checkCurrentTrackQuery.data.name,
        artist: checkCurrentTrackQuery.data.artists[0].name,
        spotifyData: checkCurrentTrackQuery.data,
      })
    }
  }, [checkCurrentTrackQuery.isSuccess, checkCurrentTrackQuery.data])

  // Cancel query if app is closed, restart query when back
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
  
  // FETCH THE INITIAL COMMENTS
  const { isLoading, isError, isSuccess, data, error: commentsError } = useQuery({
    queryKey: [`${currentlyPlaying.track}-comments-initial`],
    queryFn: async () => {
      const video = await YouTubeSearch(1, `${track} ${artist} official`, "");
      const commentsData = await YouTubeComments(video.items[0].id.videoId, "");

      return {
        video: { 
          url: `https://www.youtube.com/watch?v=${video.items[0].id.videoId}`,
          coverArt: video.items[0].snippet.thumbnails.high.url,
          videoId: video.items[0].id.videoId,
        },
        comments: commentsData.comments,
        nextPageToken: commentsData.nextPageToken
      }
    },
   
    refetchOnMount: true,
    enabled: true,
    retry: false,
  })

  useEffect(( ) => {
    if (commentsError) {
      console.error("An error occured in CommentsScreen : ", commentsError)
  }})

  // SEND COMMENTS DATA TO STATE
  useEffect(() => {
    if (isSuccess && data) {
      setAllComments(data.comments)
      setNextPageToken(data.nextPageToken || "")
    }
  }, [isSuccess, data])

  // LOAD MORE COMMENTS AND UPDATE STATE ON SCROLL
  const loadMoreComments = async () => {
    if (!nextPageToken || isLoadingMore || !data?.video?.videoId) return
    setIsLoadingMore(true)
    try {
      const commentsData = await YouTubeComments(data.video.videoId, nextPageToken)
      setAllComments(prevComments => [...prevComments, ...commentsData.comments])
      setNextPageToken(commentsData.nextPageToken || "")
    } catch (error) {
      console.error("Error loading more comments:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }

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
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (nextPageToken && !isLoadingMore) {
            loadMoreComments()
          }
        }}
        data={allComments}
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
        ListFooterComponent={
          <View>
            <Text
              style={{
                marginTop: baseUnit * 2,
                textAlign: "center",
                color: colors.text,
                opacity: 0.7,
              }}
            >
              {isLoadingMore ? "Loading more comments..." : null }
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            title="Checking your current Spotify track..."
            tintColor={lightGrey}
            titleColor={lightGrey}
            refreshing={refreshing}
            onRefresh={async () => {
            setRefreshing(true)
            try {
              await queryClient.fetchQuery({
                queryKey: ["Check-current-track"],
              })
            } catch (error) {
              console.error("Error fetching current track", error)
            } finally {
              setRefreshing(false)
            }
          }}
          />
        }
      />
    </View>
  )
}

export default CommentsScreen
