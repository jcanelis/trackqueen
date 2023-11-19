import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { FlashList } from "@shopify/flash-list"
import PropTypes from "prop-types"

// Services
import YouTubeSearch from "../../services/YouTube/getSearch"

// Components
import YouTubes from "../../components/YouTubes"

const VideoListScreen = ({ route, navigation }) => {
  const colors = useTheme()

  useEffect(() => {
    navigation.setOptions({
      title: route.params.title,
    })
  }, [navigation, route.params.title])

  let [videosToShow, setVideosToShow] = useState(route.params.videos)
  let [nextPageToken, setNextPageToken] = useState(route.params.token)
  let [numberOfRequests, setNumberOfRequests] = useState(0)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        initialNumToRender={3}
        estimatedItemSize={videosToShow.length}
        data={videosToShow}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <YouTubes fullWidth={true} item={item} />}
        refreshing={false}
        onEndReachedThreshold={0.6}
        onEndReached={async () => {
          if (numberOfRequests < 4) {
            try {
              const newData = await YouTubeSearch(
                10,
                route.params.query,
                nextPageToken
              )
              setVideosToShow([...videosToShow, ...newData.items])
              setNextPageToken(newData.nextPageToken)
              setNumberOfRequests(numberOfRequests + 1)
            } catch (error) {
              console.error(error, "An error occured in VideoListScreen")
            }
          }
        }}
      />
    </View>
  )
}

VideoListScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}

export default VideoListScreen
