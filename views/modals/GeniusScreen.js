import React, { useContext, useEffect } from "react"
import { Text, useWindowDimensions, View } from "react-native"
import { useTheme, useNavigation } from "@react-navigation/native"
import { useHeaderHeight } from "@react-navigation/elements"
import { FlashList } from "@shopify/flash-list"
import { Image } from "expo-image"
import PropTypes from "prop-types"

// Context
import SearchContext from "../../context/search"

// Components
import Annotation from "../../components/Annotation"

// Design
import { baseUnit, blurhash } from "../../constants/Base"

function GeniusScreen({ route }) {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const headerHeight = useHeaderHeight()

  // Context
  const inputText = useContext(SearchContext)

  useEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          source={route.params.data.spotifyArtistData.images[0].url}
          placeholder={blurhash}
          transition={250}
          width={width}
          height={headerHeight}
          contentFit={"cover"}
        />
      ),
    })
  }, [colors, navigation, headerHeight, route.params, width])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        automaticallyAdjustsScrollIndicatorInsets={true}
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior={"automatic"}
        contentInset={{ top: baseUnit * 2, bottom: baseUnit * 8 }}
        estimatedItemSize={route.params.data.annotations.length}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <Annotation key={item.annotations[0].id} data={item} />
        )}
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
                color: colors.text,
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
