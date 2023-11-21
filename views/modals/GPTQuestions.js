import React, { useContext } from "react"
import { Text, ScrollView, View } from "react-native"

// React Navigation
import { useNavigation, useTheme } from "@react-navigation/native"

// Context
import SpotifyContext from "../../context/spotify"

// Components
import Chip from "../../components/Chip"

// Design
import { baseUnit } from "../../constants/Base"

function GPTQuestions() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext
  const { artist, track } = currentlyPlaying
  const album = currentlyPlaying.spotifyData.album.name

  const headerStyles = {
    fontSize: baseUnit * 2.8,
    lineHeight: baseUnit * 3,
    color: colors.text,
    fontWeight: 700,
  }

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets={true}
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior={"automatic"}
      contentInset={{ bottom: baseUnit * 16 }}
      style={{
        flex: 1,
        padding: baseUnit * 3,
      }}
    >
      <View style={{ flex: 1, gap: baseUnit * 3 }}>
        <Text numberOfLines={1} ellipsizeMode={"tail"} style={headerStyles}>
          Track
        </Text>

        <Chip
          text={"Tell me about this song."}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the song, ”${track}” by ${artist}.`,
            })
          }}
        />

        <Chip
          text={"What have people said about this song?"}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `What have people said about the song, ”${track}” by ${artist}?`,
            })
          }}
        />

        <Text numberOfLines={1} ellipsizeMode={"tail"} style={headerStyles}>
          Album
        </Text>
        <Chip
          text={`Tell me about this album, ${album}.`}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the album, ”${album}” by ${artist}.`,
            })
          }}
        />

        <Chip
          text={"What have people said about this album?"}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `What have people said about the album, ”${album}” by ${artist}?`,
            })
          }}
        />

        <Text numberOfLines={1} ellipsizeMode={"tail"} style={headerStyles}>
          Artist
        </Text>

        <Chip
          text={`Tell me about ${artist}.`}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the musician ${artist}.`,
            })
          }}
        />

        <Text numberOfLines={1} ellipsizeMode={"tail"} style={headerStyles}>
          Sound
        </Text>

        <Chip
          text={"Tell me about the instruments used in this song."}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me about the instruments used in the song, ”${track}” by ${artist}?`,
            })
          }}
        />

        <Chip
          text={"What samples are used in this song?"}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `What samples are used in the song, ”${track}” by ${artist}?`,
            })
          }}
        />

        <Chip
          text={"What other songs have sampled this?"}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `What songs have sampled the track, ”${track}” by ${artist}?`,
            })
          }}
        />

        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            fontSize: baseUnit * 2.8,
            lineHeight: baseUnit * 3,
            color: colors.text,
            fontWeight: 700,
          }}
        >
          Other
        </Text>

        <Chip
          text={"What movies has this song been in?"}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `What movies has the song, ”${track}” by ${artist} been in?`,
            })
          }}
        />

        <Chip
          text={"Tell me something interesting about this song."}
          action={() => {
            navigation.navigate("Powered by GPT-4 API", {
              query: `Tell me something interesting about the song, ”${track}” by ${artist}.`,
            })
          }}
        />
      </View>
    </ScrollView>
  )
}

export default GPTQuestions
