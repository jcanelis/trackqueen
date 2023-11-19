import React from "react"
import { ScrollView, Text, View } from "react-native"
import PropTypes from "prop-types"

// Components
import Artist from "../components/Artist"
import SpotifyLogo from "../components/SpotifyLogo"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit } from "../constants/Base"

const Credits = ({ data }) => {
  const { colors } = useTheme()
  const { producers, writers } = data

  const styles = {
    heading: {
      marginTop: baseUnit * 3,
      fontSize: baseUnit * 2,
      lineHeight: baseUnit * 8,
      fontWeight: 600,
      letterSpacing: 0.16,
      textTransform: "uppercase",
      textAlign: "center",
      color: colors.tertiary,
    },

    paragraph: {
      padding: baseUnit * 1,
      fontSize: baseUnit * 2.2,
      lineHeight: baseUnit * 6,
      fontWeight: 400,
      textAlign: "center",
      color: colors.tertiary,
      opacity: 0.75,
    },
  }

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <View style={{ paddingTop: baseUnit * 6, paddingBottom: baseUnit * 2 }}>
          <SpotifyLogo />
        </View>
        <Text style={styles.heading}>Performers</Text>
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
          <Text style={styles.heading}>Producers</Text>
          {producers.map((item, index) => (
            <Text key={index} style={styles.paragraph}>
              {item.name}
            </Text>
          ))}
        </>
      )}

      {writers.length > 0 && (
        <>
          <Text style={styles.heading}>Writers</Text>
          {writers.map((item, index) => (
            <Text key={index} style={styles.paragraph}>
              {item.name}
            </Text>
          ))}
        </>
      )}

      <Text style={styles.heading}>Label</Text>
      <Text style={styles.paragraph}>{data.label}</Text>
    </View>
  )
}

Credits.propTypes = {
  data: PropTypes.object,
}

export default Credits
