import React, { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"
import PropTypes from "prop-types"

// Context
import SpotifyContext from "../context/spotify"

// Expo
import { Button, Host } from "@expo/ui/swift-ui"

// Design
import { baseUnit, GOLD } from "../constants/Base"

const GeniusLink = ({ data }) => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const navigation = useNavigation()

  return (
    <>
      {data.annotations.length > 0 && (
        <Host style={{ padding: baseUnit * 4 }}>
          <Button
            variant="glassProminent"
            color={GOLD}
            controlSize="regular"
            style={{ width: 240 }}
            onPress={() =>
              navigation.navigate(`${currentlyPlaying.track} on Genius`, {
                data: data,
              })
            }
          >
            <Text style={{ color: "#ffffff" }}>
              View annotations from Genius
            </Text>
          </Button>
        </Host>
      )}
    </>
  )
}

GeniusLink.propTypes = {
  data: PropTypes.object,
}

export default GeniusLink
