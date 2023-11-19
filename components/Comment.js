import React from "react"
import { Text, View } from "react-native"

import PropTypes from "prop-types"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit, verticalRhythm } from "../constants/Base"
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
        paddingTop: baseUnit * 3,
        paddingRight: baseUnit * 3,
        paddingBottom: baseUnit * 3,
        paddingLeft: baseUnit * 3,
      }}
    >
      <Text
        style={{
          fontSize: 19,
          lineHeight: verticalRhythm * 7,
          fontWeight: 500,
          textAlign: "left",
          color: colors.tertiary,
          opacity: 0.95,
        }}
      >
        {content}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: baseUnit / 2,
          opacity: 0.85,
        }}
      >
        <Ionicons
          style={{ opacity: 0.65 }}
          name={"ios-heart-outline"}
          color={colors.tertiary}
          size={22}
        />
        <Text
          style={{
            fontSize: baseUnit * 2,
            lineHeight: baseUnit * 4,
            fontWeight: 500,
            textAlign: "left",
            color: colors.tertiary,
            opacity: 0.85,
          }}
        >
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
