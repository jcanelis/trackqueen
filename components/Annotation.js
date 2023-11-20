import React, { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import PropTypes from "prop-types"

// Expo
import * as WebBrowser from "expo-web-browser"
import { Image } from "expo-image"

// Paper
import { Button, useTheme, Text } from "react-native-paper"

// Components
import Chip from "../components/Chip"

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
      <Chip
        text={lyric}
        action={() => {
          setExpanded(expanded ? false : true)
        }}
      />

      {expanded && (
        <View style={{ margin: baseUnit * 3 }}>
          <View>
            <Text style={{ color: colors.primary }} variant={"bodyLarge"}>
              {lyric}
            </Text>
          </View>
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
                variant={"labelLarge"}
                style={{
                  marginTop: baseUnit,
                  color: colors.tertiary,
                }}
              >
                {user.user.name}
              </Text>
            </Pressable>
          )}

          <Text
            variant={"bodyLarge"}
            style={{
              paddingTop: baseUnit,
              paddingBottom: baseUnit * 2,
              color: colors.tertiary,
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
                name={"md-heart-outline"}
                color={colors.tertiary}
                size={26}
              />
              <Text
                variant={"labelSmall"}
                style={{
                  marginLeft: baseUnit / 2,
                  color: colors.tertiary,
                  opacity: 0.85,
                }}
              >
                {annotation.votes_total}
              </Text>
            </View>
            <View style={{ paddingTop: baseUnit * 2 }}>
              <Button
                mode={"outlined"}
                accessibilityLabel={"View on Genius"}
                textColor={colors.onSecondaryContainer}
                rippleColor={colors.tertiary}
                onPress={() => {
                  _handlePressButtonAsync(annotation.url)
                }}
              >
                View on Genius
              </Button>
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
