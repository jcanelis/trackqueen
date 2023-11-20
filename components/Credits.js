import React from "react"
import { ScrollView, View } from "react-native"
import PropTypes from "prop-types"

// Components
import Artist from "../components/Artist"
import SpotifyLogo from "../components/SpotifyLogo"

// Paper
import { Text } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

const Credits = ({ data }) => {
  const { producers, writers } = data

  return (
    <>
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingTop: baseUnit * 6, paddingBottom: baseUnit * 2 }}>
          <SpotifyLogo />
        </View>
        <Text>Performers</Text>
        <ScrollView
          horizontal={true}
          centerContent={true}
          directionalLockEnabled={true}
          pagingEnabled={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: baseUnit * 4,
          }}
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          {data.performers.map((artist, index) => {
            return <Artist key={index} item={artist} />
          })}
        </ScrollView>
      </View>

      {producers.length > 0 && (
        <>
          <Text variant={"labelMedum"}>Producers</Text>
          {producers.map((item, index) => (
            <Text variant={"bodyLarge"} key={index}>
              {item.name}
            </Text>
          ))}
        </>
      )}

      {writers.length > 0 && (
        <>
          <Text variant={"labelMedium"}>Writers</Text>
          {writers.map((item, index) => (
            <Text variant={"bodyLarge"} key={index}>
              {item.name}
            </Text>
          ))}
        </>
      )}

      <Text variant={"bodyLarge"}>Label</Text>
      <Text variant={"bodyLarge"}>{data.label}</Text>
    </>
  )
}

Credits.propTypes = {
  data: PropTypes.object,
}

export default Credits
