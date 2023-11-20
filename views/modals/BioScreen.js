import React, { useContext } from "react"
import { ScrollView, useWindowDimensions, View } from "react-native"
import PropTypes from "prop-types"

// Paper
import { Button, useTheme, Text } from "react-native-paper"

// React Navigation
import { useNavigation } from "@react-navigation/native"

// Context
import SpotifyContext from "../../context/spotify"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Components
import Chip from "../../components/Chip"

import SpotifyLogo from "../../components/SpotifyLogo"

// Design
import { baseUnit, blurhash } from "../../constants/Base"

function BioScreen({ route }) {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { width } = useWindowDimensions()

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext
  const { artist } = currentlyPlaying

  const bioText =
    route.params.bio === null
      ? "No information found on Genius.com."
      : route.params.bio

  return (
    <ScrollView
      stickyHeaderHiddenOnScroll={true}
      contentContainerStyle={{
        alignItems: "center",
        gap: baseUnit * 3,
        paddingTop: baseUnit * 12,
      }}
      scrollToOverflowEnabled={true}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: baseUnit * 2,
        }}
      >
        <Image
          placeholder={blurhash}
          source={route.params.image}
          transition={250}
          style={{ borderRadius: width / 2 }}
          height={width / 2}
          width={width / 2}
        />

        <SpotifyLogo />
      </View>

      <View style={{ flexDirection: "row" }}>
        <Button
          mode={"text"}
          accessibilityLabel={"Top tracks"}
          textColor={colors.onSecondaryContainer}
          rippleColor={colors.tertiary}
          onPress={() => {
            navigation.navigate("Top Tracks", {
              item: currentlyPlaying.spotifyData.artists[0],
              coverImage: route.params.image,
            })
          }}
        >
          Top tracks
        </Button>

        {route.params.instagram && (
          <Button
            mode={"text"}
            accessibilityLabel={"Instagram"}
            textColor={colors.onSecondaryContainer}
            rippleColor={colors.tertiary}
            onPress={() => {
              Linking.openURL(
                `https://instagram.com/${route.params.data.artistInfo.artist.instagram_name}`
              )
            }}
          >
            Instagram
          </Button>
        )}

        <Button
          mode={"text"}
          accessibilityLabel={"Ask ChatGPT"}
          textColor={colors.onSecondaryContainer}
          rippleColor={colors.tertiary}
          onPress={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the musician ${artist}.`,
            })
          }}
        >
          Ask ChatGPT
        </Button>
      </View>

      <Text
        variant={"bodyLarge"}
        style={{
          paddingLeft: baseUnit * 3,
          paddingRight: baseUnit * 3,

          color: colors.tertiary,
        }}
      >
        {bioText}
      </Text>

      {bioText !== "No information found on Genius.com." && (
        <Text
          variant={"labelSmall"}
          style={{
            paddingLeft: baseUnit * 3,
            paddingRight: baseUnit * 3,
            color: colors.tertiary,
          }}
        >
          Source: Genius.com
        </Text>
      )}

      {bioText === "No information found on Genius.com." && (
        <Chip
          text={`Ask ChatGPT about ${artist}.`}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the musician ${artist}.`,
            })
          }}
        />
      )}
    </ScrollView>
  )
}

BioScreen.propTypes = {
  route: PropTypes.object,
}

export default BioScreen
