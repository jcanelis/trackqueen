import React from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import PropTypes from "prop-types"

// Expo
import * as Linking from "expo-linking"

// Components
import ArtistLarge from "../../components/ArtistLarge"
import Header from "../../components/Header"
import SpotifyButton from "../../components/SpotifyButton"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { baseUnit } from "../../constants/Base"

const ArtistListScreen = ({ route }) => {
  const colors = useTheme()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        contentContainerStyle={{ paddingBottom: baseUnit * 8 }}
        numColumns={2}
        initialNumToRender={6}
        estimatedItemSize={20}
        ListHeaderComponent={
          <Header
            border={false}
            type={"spotify"}
            buttonTitle={`Open Spotify`}
            copy={"Similar artists"}
            func={() => Linking.openURL("https://open.spotify.com")}
          />
        }
        ListFooterComponent={
          <View style={{ margin: baseUnit * 4 }}>
            <SpotifyButton
              text={"Open Spotify"}
              func={() => Linking.openURL("https://open.spotify.com")}
            />
          </View>
        }
        refreshing={false}
        onEndReachedThreshold={0.7}
        data={route.params.artists}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return <ArtistLarge item={item} image={item.images[0].url} />
        }}
      />
    </View>
  )
}

ArtistListScreen.propTypes = {
  route: PropTypes.object,
}

export default ArtistListScreen
