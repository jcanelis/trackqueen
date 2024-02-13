import React, { useContext } from "react"
import { Text, Pressable, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import PropTypes from "prop-types"

// Context
import SpotifyContext from "../context/spotify"

// Design
import { baseUnit, GOLD } from "../constants/Base"
import { Ionicons } from "@expo/vector-icons"

const GeniusLink = ({ data }) => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const navigation = useNavigation()

  return (
    <View style={{ alignItems: "center" }}>
      {data.annotations.length > 0 && (
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
              marginBottom: baseUnit,
            },
          ]}
          onPress={() =>
            navigation.navigate(`${currentlyPlaying.track} on Genius`, {
              data: data,
            })
          }
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: baseUnit * 2.2,
                lineHeight: baseUnit * 3,
                fontWeight: 600,
                color: GOLD,
              }}
            >
              {data.annotations.length} annotations from Genius
            </Text>

            <Ionicons
              name={"chevron-forward"}
              color={GOLD}
              size={baseUnit * 3}
            />
          </View>
        </Pressable>
      )}
    </View>
  )
}

GeniusLink.propTypes = {
  data: PropTypes.object,
}

export default GeniusLink
