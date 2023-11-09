import React from "react"
import { Button } from "react-native"
import * as Linking from "expo-linking"
import PropTypes from "prop-types"

const SocialButtons = ({ data }) => (
  <Button
    title="Instagram"
    color={"#91A18B"}
    onPress={() => {
      Linking.openURL(
        `https://instagram.com/${data.artistInfo.artist.instagram_name}`
      )
    }}
  />
)

SocialButtons.propTypes = {
  data: PropTypes.object,
}

export default SocialButtons
