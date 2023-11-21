import React from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import PropTypes from "prop-types"

// Components
import Annotation from "../../components/Annotation"

// Paper
import { useTheme, Text, TextInput } from "react-native-paper"

// Context
// import SearchContext from "../../context/search"

// Design
import { baseUnit } from "../../constants/Base"

function GeniusScreen({ route }) {
  // const inputText = useContext(SearchContext)
  const { colors } = useTheme()
  const [text, setText] = React.useState("")

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        contentContainerStyle={{
          paddingBottom: baseUnit * 8,
        }}
        estimatedItemSize={route.params.data.annotations.length}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Annotation data={item} />}
        refreshing={false}
        data={route.params.data.annotations.filter(
          (d) => text === "" || d.range.content.includes(text)
        )}
        ListHeaderComponent={
          <View style={{ padding: baseUnit * 3 }}>
            <TextInput
              autoCapitalize={"none"}
              maxLength={20}
              numberOfLines={1}
              label="Search Genius annotations"
              value={text}
              inputMode={"text"}
              autoFocus={false}
              onChangeText={(text) => setText(text)}
            />
          </View>
        }
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
