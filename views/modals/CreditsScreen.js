import React from "react"
import { ScrollView } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Components
import Credits from "../../components/Credits"

const CreditsScreen = ({ route }) => {
  const { colors } = useTheme()

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Credits data={route.params.data} />
    </ScrollView>
  )
}

CreditsScreen.propTypes = {
  route: PropTypes.object,
}

export default CreditsScreen
