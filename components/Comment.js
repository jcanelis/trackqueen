import React from "react"
import { View } from "react-native"

import PropTypes from "prop-types"

// Paper
import { useTheme, Text } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"
import { Ionicons } from "@expo/vector-icons"

const Comment = ({ data }) => {
  const { colors } = useTheme()

  // Get data from YouTube comment object
  const content = data.snippet.topLevelComment.snippet.textOriginal
  const likes = data.snippet.topLevelComment.snippet.likeCount.toString()
  const date = data.snippet.topLevelComment.snippet.publishedAt
  const newDate = new Date(date).toDateString()

  return (
    <View
      style={{
        gap: baseUnit,
        paddingTop: baseUnit * 2,
        paddingRight: baseUnit * 1,
        paddingBottom: baseUnit * 3,
        paddingLeft: baseUnit * 3,
      }}
    >
      <Text variant="bodyLarge">{content}</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: baseUnit / 2,
        }}
      >
        <Ionicons name={"md-heart-outline"} color={colors.tertiary} size={22} />
        <Text>
          {likes} • {newDate}
        </Text>
      </View>
    </View>
  )
}

Comment.propTypes = {
  data: PropTypes.object,
}

export default Comment
