import React from "react"
import { FlatList } from "react-native"
import PropTypes from "prop-types"

// Design
import { baseUnit } from "../constants/Base"
import YouTubes from "../components/YouTubes"

const YouTubeList = ({ fullWidth, videos }) => {
  // Eventually build placeholder loading UI elements
  // const placeholders = Array.from({ length: 8 }, (v, i) => i)
  return (
    <FlatList
      horizontal={true}
      pagingEnabled={false}
      directionalLockEnabled={true}
      data={videos}
      initialNumToRender={3}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => <YouTubes fullWidth={fullWidth} item={item} />}
      refreshing={false}
      contentContainerStyle={{
        paddingLeft: baseUnit * 3,
        columnGap: baseUnit * 3,
      }}
    />
  )
}

YouTubeList.propTypes = {
  query: PropTypes.string,
  fullWidth: PropTypes.bool,
  videos: PropTypes.array,
}

export default YouTubeList
