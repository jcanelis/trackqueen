import React from "react"
import { ScrollView } from "react-native"
import { useTheme } from "@react-navigation/native"
import PropTypes from "prop-types"

// Components
import Credits from "../../components/Credits"

// Design
import { baseUnit } from "../../constants/Base"

const CreditsScreen = ({ route }) => {
  const { colors } = useTheme()

  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets={true}
      automaticallyAdjustContentInsets={true}
      contentInsetAdjustmentBehavior={"automatic"}
      contentInset={{ bottom: baseUnit * 16 }}
      scrollsToTop={true}
      scrollToOverflowEnabled={true}
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
