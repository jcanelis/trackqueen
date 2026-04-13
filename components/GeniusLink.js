import React, { useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import PropTypes from "prop-types"

// Context
import SpotifyContext from "../context/spotify"

import { Button, Host, Text } from "@expo/ui/swift-ui"
import {
  buttonStyle,
  controlSize,
  tint,
  fixedSize,
} from "@expo/ui/swift-ui/modifiers"

// Design
import { baseUnit, GOLD } from "../constants/Base"

const GeniusLink = ({ data }) => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const navigation = useNavigation()

  return (
    <>
      {data && data.annotations && data.annotations.length > 0 && (
        <Host style={{ padding: baseUnit * 4 }} matchContents>
          <Button
            label={"View annotations from Genius"}
            modifiers={[
              controlSize("extraLarge"),
              buttonStyle("glassProminent"),
              tint(GOLD),
              fixedSize({
                horizontal: true,
                vertical: true,
              }),
            ]}
            onPress={() =>
              navigation.navigate(`${currentlyPlaying.track} on Genius`, {
                data: data,
              })
            }
          >
            <Text>View annotations from Genius</Text>
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
