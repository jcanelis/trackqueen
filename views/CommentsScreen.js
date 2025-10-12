import React, { useEffect, useContext, useRef, useState } from "react"
import { AppState, FlatList, RefreshControl, Text, View } from "react-native"
import { Host, Picker } from "@expo/ui/swift-ui"

// React Navigation
import {
  useNavigation,
  useScrollToTop,
  useTheme,
} from "@react-navigation/native"

// Data Fetching
import { useQuery, useQueryClient } from "@tanstack/react-query"
import CommentsScreenModel from "../models/commentsScreenModel"
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
  const { colors, theme } = useTheme()
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
  let [commentsRelevant, setCommentsRelevant] = useState([])
  let [commentsRecent, setCommentsRecent] = useState([])

  // Comments to be displayed
  let [commentsToShow, setCommentsToShow] = useState(commentsRelevant)

  // Comments nextPageToken for new requests
  let [nextPageTokenRecent, setPageTokenRecent] = useState("")
  let [nextPageTokenRelevant, setPageTokenRelevant] = useState("")

  // Tab index
  let [index, setIndex] = useState(0)

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
    [`${currentlyPlaying.track}-comments`],
    async () => {
      const model = await CommentsScreenModel(currentlyPlaying)

      // Set initial comments
      setCommentsToShow(model.commentsRelevant)

      // Save other comments
      setCommentsRelevant(model.commentsRelevant)
      setCommentsRecent(model.commentsRecent)

      // Save nextPageTokens
      setPageTokenRelevant(model.commentsRelevantData.data.nextPageToken)
      setPageTokenRecent(model.commentsRecentData.data.nextPageToken)

      return model
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
      <FlatList
        ref={ref}
        automaticallyAdjustsScrollIndicatorInsets={true}
        automaticallyAdjustContentInsets={true}
        contentInset={{ bottom: baseUnit * 6 }}
        contentInsetAdjustmentBehavior={"automatic"}
        style={{ flex: 1 }}
        scrollsToTop={true}
        scrollToOverflowEnabled={true}
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
                navigation.navigate("Powered by GPT-4 API", {
                  query: `What have people said about the song, ”${track}” by ${artist}?`,
                })
              }}
            />
          </View>
        }
        ListHeaderComponent={
          <>
            <VideoThumbnail data={data} />
            <Header
              buttonTitle={"Ask ChatGPT"}
              type={"youtube"}
              copy={"Comments"}
              func={() => {
                navigation.navigate("Powered by GPT-4 API", {
                  query: `What have people said about the song, ”${track}” by ${artist}?`,
                })
              }}
              border={false}
            />

            {commentsToShow.length > 0 && (
              <Host
                appearance={theme == "dark" ? "dark" : "light"}
                style={{
                  flex: 1,
                  marginRight: baseUnit * 3,
                  marginLeft: baseUnit * 3,
                  height: baseUnit * 6,
                }}
              >
                <Picker
                  controlSize="large"
                  options={["Popular", "Recent"]}
                  variant="segmented"
                  selectedIndex={index}
                  onOptionSelected={({ nativeEvent: { index } }) => {
                    const indexData =
                      index == 0 ? commentsRelevant : commentsRecent
                    setCommentsToShow(indexData)
                    setIndex(index)
                  }}
                />
              </Host>
            )}
          </>
        }
        onEndReachedThreshold={0.6}
        onEndReached={async () => {
          const queryType = index === 0 ? "relevance" : "time"
          const pageToken =
            queryType === "relevance"
              ? nextPageTokenRelevant
              : nextPageTokenRecent

          try {
            const searchData = await YouTubeComments(
              data.videoId,
              pageToken,
              queryType
            )

            // Update token for the query type
            if (queryType === "relevance") {
              setPageTokenRelevant(searchData.data.nextPageToken)
            } else {
              setPageTokenRecent(searchData.data.nextPageToken)
            }

            setCommentsToShow([...commentsToShow, ...searchData.comments])
          } catch (error) {
            console.error(error)
          }
        }}
        data={commentsToShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comment data={item} />}
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
