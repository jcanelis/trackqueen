import React, { useEffect } from "react"
import { Pressable, View, Text } from "react-native"
import { useTheme } from "@react-navigation/native"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { FlashList } from "@shopify/flash-list"

// Expo
import * as Linking from "expo-linking"
import { Image } from "expo-image"

// Custom
import ProfileScreenModel from "../../models/profileScreenModel"

// Components
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import SpotifyButton from "../../components/SpotifyButton"
import Track from "../../components/Track"

// Design
import { baseUnit, blurhash } from "../../constants/Base"

function ProfileScreen() {
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["ProfileScreen"],
    queryFn: async ({ signal }) => await ProfileScreenModel(signal),
    refetchOnMount: true,
    keepPreviousData: true,
    enabled: true,
    retry: true,
    onError: (error) => {
      console.error("Error on ProfileScreen", error)
    },
  })

  useEffect(() => {
    // Cancel the query on cleanup
    // Should add a check for if query is actually running
    return function cleanUp() {
      queryClient.cancelQueries({
        queryKey: ["ProfileScreen"],
      })
    }
  }, [queryClient])

  // What to show while the query is loading
  if (isLoading) return <Loader />

  // What to show if the query fails
  if (error) return <Loader />

  // What to show if there's a response but no data
  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text>Unable to load your profile information.</Text>
        <SpotifyButton
          text={"Try again"}
          func={() => {
            queryClient.resetQueries({
              queryKey: ["ProfileScreen"],
            })
            queryClient.fetchQuery({
              queryKey: ["ProfileScreen"],
            })
          }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <FlashList
        estimatedItemSize={20}
        automaticallyAdjustsScrollIndicatorInsets={true}
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior={"automatic"}
        contentInset={{ bottom: baseUnit * 6 }}
        ListHeaderComponent={
          <View>
            {data && data.recentTracks > 0 && (
              <>
                <View
                  style={{
                    paddingTop: baseUnit * 3,
                    paddingLeft: baseUnit * 3,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        Linking.openURL(data.user.external_urls.spotify)
                      }
                      style={({ pressed }) => [
                        {
                          width: baseUnit * 8,
                          height: baseUnit * 8,
                          opacity: pressed ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Image
                        source={data.user.images[0].url}
                        height={baseUnit * 8}
                        width={baseUnit * 8}
                        placeholder={blurhash}
                        style={{
                          borderRadius: baseUnit * 8,
                          opacity: 0.8,
                        }}
                      />
                    </Pressable>

                    <View
                      style={{
                        paddingLeft: baseUnit * 2,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: baseUnit * 1.8,
                          lineHeight: baseUnit * 2,
                          letterSpacing: 0.4,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: colors.text,
                          opacity: 0.65,
                        }}
                      >
                        {data.user.product}
                      </Text>

                      <Text
                        style={{
                          fontSize: baseUnit * 1.8,
                          lineHeight: baseUnit * 3,
                          fontWeight: 500,
                          color: colors.text,
                        }}
                      >
                        {data.user.email}
                      </Text>
                    </View>
                  </View>
                </View>
                <Header
                  type={"spotify"}
                  copy={`${data.recentTracks.length} tracks`}
                  buttonTitle={"Open Spotify"}
                  func={() => {
                    Linking.openURL(
                      "https://open.spotify.com/collection/tracks"
                    )
                  }}
                />
              </>
            )}
          </View>
        }
        ListFooterComponent={
          <View style={{ margin: baseUnit * 4 }}>
            <SpotifyButton
              text={"Open Spotify"}
              func={() => {
                Linking.openURL(data.user.external_urls.spotify)
              }}
            />
          </View>
        }
        refreshing={false}
        data={data.recentTracks}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          return (
            <Track
              artists={item.track.album.artists}
              coverArt={item.track.album.images[2].url}
              link={item.track.external_urls.spotify}
              title={item.track.name}
            />
          )
        }}
      />
    </View>
  )
}

export default ProfileScreen
