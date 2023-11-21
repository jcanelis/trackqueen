import React, { useContext } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import PropTypes from "prop-types"

// Paper
import { Button, useTheme } from "react-native-paper"

// Context
import SpotifyContext from "../context/spotify"

const GeniusLink = ({ data }) => {
  const { colors } = useTheme()
  const { currentlyPlaying } = useContext(SpotifyContext)
  const navigation = useNavigation()

  return (
    <View style={{ alignItems: "center" }}>
      {data.annotations.length > 0 && (
        <Button
          icon={"information"}
          mode={"outlined"}
          accessibilityLabel={`${data.annotations.length} annotations from Genius`}
          textColor={colors.onSecondaryContainer}
          rippleColor={colors.tertiary}
          onPress={() =>
            navigation.navigate(`${currentlyPlaying.track} on Genius`, {
              data: data,
            })
          }
        >
          {data.annotations.length} annotations from Genius
        </Button>
      )}
    </View>
  )
}

GeniusLink.propTypes = {
  data: PropTypes.object,
}

export default GeniusLink
