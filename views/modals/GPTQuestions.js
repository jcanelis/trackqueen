import React, { useContext } from "react"
import { ScrollView, View } from "react-native"

// Paper
import { Text } from "react-native-paper"

// React Navigation
import { useNavigation } from "@react-navigation/native"

// Context
import SpotifyContext from "../../context/spotify"

// Components
import Chip from "../../components/Chip"

// Design
import { baseUnit } from "../../constants/Base"

function GPTQuestions() {
  const navigation = useNavigation()

  // Context
  const spotifyContext = useContext(SpotifyContext)
  const { currentlyPlaying } = spotifyContext
  const { artist, track } = currentlyPlaying
  const album = currentlyPlaying.spotifyData.album.name

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: baseUnit * 16,
      }}
      style={{
        flex: 1,
        padding: baseUnit * 3,
      }}
    >
      <View style={{ flex: 1, gap: baseUnit * 3 }}>
        <Text variant={"bodyLarge"} numberOfLines={1} ellipsizeMode={"tail"}>
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

        <Text variant={"bodyLarge"} numberOfLines={1} ellipsizeMode={"tail"}>
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

        <Text variant={"bodyLarge"} numberOfLines={1} ellipsizeMode={"tail"}>
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

        <Text variant={"bodyLarge"} numberOfLines={1} ellipsizeMode={"tail"}>
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

        <Text variant={"bodyLarge"} numberOfLines={1} ellipsizeMode={"tail"}>
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
