import React, { useContext } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import PropTypes from "prop-types"

// Context
import SearchContext from "../../context/search"

// Components
import Annotation from "../../components/Annotation"

// Paper
import { useTheme, Text } from "react-native-paper"

// Design
import { baseUnit } from "../../constants/Base"

function GeniusScreen({ route }) {
  const { colors } = useTheme()

  // Context
  const inputText = useContext(SearchContext)

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        estimatedItemSize={route.params.data.annotations.length}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Annotation data={item} />}
        refreshing={false}
        data={route.params.data.annotations.filter(
          (d) => inputText === "" || d.range.content.includes(inputText)
        )}
        ListEmptyComponent={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: baseUnit * 2,
                lineHeight: baseUnit * 3,
                fontWeight: 400,
                color: colors.tertiary,
                opacity: 0.85,
              }}
            >
              No annotations found
            </Text>
          </View>
        }
      />
    </View>
  )
}

GeniusScreen.propTypes = {
  route: PropTypes.object,
}

export default GeniusScreen
