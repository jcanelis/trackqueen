import React, { useEffect, useState } from "react"
import { Button, Text, Pressable, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import * as WebBrowser from "expo-web-browser"
import { Image } from "expo-image"

// Design
import { blurhash, baseUnit, GOLD } from "../constants/Base"
import { Ionicons } from "@expo/vector-icons"

const Annotation = ({ data }) => {
  const { colors } = useTheme()
  const [expanded, setExpanded] = useState(false)

  // Setup data
  const annotation = data.annotations[0]
  const lyric = data.range.content
  const user = data.annotations[0].authors[0]

  // Links to Genius
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url)
  }

  useEffect(() => {
    return function cleanUp() {
      if (expanded) {
        setExpanded(false)
      }
    }
  }, [expanded])

  return (
    <View
      style={{
        paddingLeft: baseUnit * 3,
        paddingRight: baseUnit * 3,
        paddingTop: baseUnit * 2,
        paddingBottom: baseUnit * 2,
      }}
    >
      <Pressable
        onPress={() => {
          setExpanded(expanded ? false : true)
        }}
        style={({ pressed }) => [
          {
            borderRadius: baseUnit * 2,
            borderColor: colors.border,
            backgroundColor: colors.card,
            borderWidth: 1,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={{
            padding: baseUnit * 3,
            fontSize: baseUnit * 2.1,
            lineHeight: baseUnit * 3,
            fontWeight: 500,
            color: annotation.verified ? GOLD : colors.text,
            borderRadius: baseUnit * 2,
          }}
        >
          {lyric}
        </Text>
      </Pressable>

      {expanded && (
        <View style={{ margin: baseUnit * 3 }}>
          {annotation.verified && (
            <Pressable
              onPress={() => {
                _handlePressButtonAsync(user.user.url)
              }}
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: baseUnit * 3,
                marginRight: baseUnit * 3,
                marginBottom: baseUnit * 2,
              }}
            >
              <Image
                source={user.user.avatar.medium.url}
                placeholder={blurhash}
                transition={250}
                height={baseUnit * 9}
                width={baseUnit * 9}
                style={{ borderRadius: baseUnit * 9 }}
              />
              <Text
                style={{
                  marginTop: baseUnit,
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                {user.user.name}
              </Text>
            </Pressable>
          )}

          <Text
            style={{
              paddingTop: baseUnit,
              paddingBottom: baseUnit * 2,
              fontSize: baseUnit * 2.3,
              lineHeight: baseUnit * 4,
              fontWeight: 400,
              color: colors.text,
              opacity: 0.85,
            }}
          >
            {annotation.body.plain}
          </Text>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                marginTop: baseUnit * 2,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={"ios-heart-outline"}
                color={colors.text}
                size={26}
              />
              <Text
                style={{
                  marginLeft: baseUnit / 2,
                  fontSize: baseUnit * 2,
                  lineHeight: baseUnit * 3,
                  fontWeight: 600,
                  color: colors.text,
                  opacity: 0.85,
                }}
              >
                {annotation.votes_total}
              </Text>
            </View>
            <View style={{ padding: baseUnit }}>
              <Button
                title={"View on Genius"}
                color={GOLD}
                onPress={() => {
                  _handlePressButtonAsync(annotation.url)
                }}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

Annotation.propTypes = {
  data: PropTypes.object,
}

export default Annotation
