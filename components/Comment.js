import React from "react"
import { Text, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"
import { SymbolView } from "expo-symbols"

// Design
import { baseUnit, verticalRhythm } from "../constants/Base"

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
          color: colors.text,
          opacity: 1,
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
        <SymbolView
          name="hand.thumbsup.fill"
          size={baseUnit * 2.2}
          tintColor={colors.text}
        />
        <View 
          style={{
            flex: 1,
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: baseUnit,
            }}
          >
          <Text style={{
            fontSize: baseUnit * 2,
            letterSpacing: 0.5,
            lineHeight: baseUnit * 4,
            marginLeft: 2,
            fontWeight: 500,
            textAlign: "left",
            color: colors.text,
            opacity: 1,
          }}>
            {likes}
          </Text>
          <Text style={{
            fontSize: baseUnit * 2,
              lineHeight: baseUnit * 4,
              marginLeft: 2,
              fontWeight: 500,
              textAlign: "left",
              color: colors.text,
              opacity: 0.5,
          }}>
            {newDate}
          </Text>
        </View>
      </View>
    </View>
  )
}

Comment.propTypes = {
  data: PropTypes.object,
}

export default Comment
