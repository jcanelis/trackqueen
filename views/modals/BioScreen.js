import React, { useContext, useEffect } from "react"
import {
  Button,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native"
import PropTypes from "prop-types"

// React Navigation
import { useNavigation, useTheme } from "@react-navigation/native"
import { useHeaderHeight } from "@react-navigation/elements"

// Context
import SpotifyContext from "../../context/spotify"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Components
import Chip from "../../components/Chip"
import SpotifyLogo from "../../components/SpotifyLogo"

// Design
import { baseUnit, blurhash, GOLD, verticalRhythm } from "../../constants/Base"

function BioScreen({ route }) {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const headerHeight = useHeaderHeight()

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          source={route.params.data.spotifyArtistData.images[0].url}
          placeholder={blurhash}
          transition={250}
          width={width}
          height={headerHeight - baseUnit}
          contentFit={"cover"}
        />
      ),
    })
  }, [colors, navigation, headerHeight, route.params, width])

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
          style={{ marginTop: headerHeight, borderRadius: width / 2 }}
          height={width / 2}
          width={width / 2}
        />

        <SpotifyLogo />
      </View>

      <View style={{ flexDirection: "row" }}>
        {route.params.instagram && (
          <Button
            color={GOLD}
            title={"Instagram"}
            onPress={() => {
              Linking.openURL(
                `https://instagram.com/${route.params.data.artistInfo.artist.instagram_name}`
              )
            }}
          />
        )}

        <Button
          color={GOLD}
          title={"Top tracks"}
          onPress={() => {
            navigation.navigate("Top Tracks", {
              item: currentlyPlaying.spotifyData.artists[0],
              coverImage: route.params.image,
            })
          }}
        />

        <Button
          color={GOLD}
          title={"Ask ChatGPT"}
          onPress={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the musician ${artist}.`,
            })
          }}
        />
      </View>
      <Text
        style={{
          paddingLeft: baseUnit * 3,
          paddingRight: baseUnit * 3,
          fontSize: baseUnit * 2.2,
          lineHeight: verticalRhythm * 7,
          fontWeight: 400,
          color: colors.text,
          opacity: 0.85,
        }}
      >
        {bioText}
      </Text>

      {bioText !== "No information found on Genius.com." && (
        <Text
          style={{
            paddingLeft: baseUnit * 3,
            paddingRight: baseUnit * 3,
            fontSize: baseUnit * 2,
            lineHeight: verticalRhythm * 5,
            fontWeight: 500,
            color: colors.text,
            opacity: 0.65,
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
