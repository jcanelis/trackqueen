import React, { useState, useRef, useEffect } from "react"
import { AppState, Pressable, ScrollView, View } from "react-native"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import PropTypes from "prop-types"

// Paper
import { ActivityIndicator, Button, useTheme, Text } from "react-native-paper"

// Expo
import * as WebBrowser from "expo-web-browser"
import { useAssets } from "expo-asset"
import { Image } from "expo-image"

// Services
import ChatGPT from "../../services/ChatGPT/getAnswers"

// Components
import StatusText from "../../components/StatusText"

// Design
import { baseUnit, verticalRhythm } from "../../constants/Base"

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url)
}

function GPTResponse({ route }) {
  const { colors } = useTheme()
  const queryClient = useQueryClient()

  // https://reactnative.dev/docs/appstate
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // https://docs.expo.dev/versions/latest/sdk/asset/
  const [assets, error] = useAssets([
    require("../../assets/brands/openai/PNGs/openai-white-lockup.png"),
  ])

  const { isLoading, isError, data } = useQuery({
    queryKey: ["chat-gpt-response"],
    queryFn: async ({ signal }) => await ChatGPT(route.params.query, signal),
    refetchOnMount: true,
    keepPreviousData: false,
    enabled: true,
    retry: false,
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      console.error("An error occured in ChatGPTResponse : ", error)
      console.log("appStateVisible : ", appStateVisible)
    },
  })

  // Cancel query if view is closed
  useEffect(() => {
    return function cleanUp() {
      console.log("Cleaning up GPT Response...")

      // Cancel the query
      queryClient.cancelQueries({
        queryKey: ["chat-gpt-response"],
      })

      // Reset the query
      queryClient.resetQueries({
        queryKey: ["chat-gpt-response"],
      })
    }
  }, [queryClient])

  // Cancel query if app is closed
  // Restart query when back
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        queryClient.resetQueries({
          queryKey: ["chat-gpt-response"],
        })
      } else {
        queryClient.cancelQueries({
          queryKey: ["chat-gpt-response"],
        })
      }

      appState.current = nextAppState
      setAppStateVisible(appState.current)
    })

    return () => {
      subscription.remove()
    }
  }, [queryClient])

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          gap: verticalRhythm * 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.tertiary} />

        <StatusText content={`”${route.params.query}”`} />

        <Text
          variant={"labelMedium"}
          style={{
            marginBottom: baseUnit * 3,
            fontWeight: 500,
            color: colors.tertiary,
            opacity: 0.5,
          }}
        >
          Responses from ChatGPT take a few seconds.
        </Text>
        {assets && !error && (
          <Image
            style={{ opacity: 1 }}
            source={assets[0].localUri}
            width={2200 / 24}
            height={598 / 24}
          />
        )}
      </View>
    )

  if (isError)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text variant={"labelSmall"} style={{ color: colors.tertiary }}>
          Unfortunately an error occured.
        </Text>

        <Button
          mode={"outlined"}
          accessibilityLabel={"Try again"}
          textColor={colors.onSecondaryContainer}
          rippleColor={colors.tertiary}
          onPress={() =>
            queryClient.resetQueries({
              queryKey: ["chat-gpt-response"],
            })
          }
        >
          Try again
        </Button>
      </View>
    )

  if (data && data.error)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text variant={"labelSmall"} style={{ color: colors.tertiary }}>
          Unfortunately an error occured.
        </Text>

        <Button
          mode={"outlined"}
          accessibilityLabel={"Try again"}
          textColor={colors.onSecondaryContainer}
          rippleColor={colors.tertiary}
          onPress={() =>
            queryClient.resetQueries({
              queryKey: ["chat-gpt-response"],
            })
          }
        >
          Try again
        </Button>
      </View>
    )

  return (
    <ScrollView
      contentContainerStyle={{
        gap: baseUnit * 2,
      }}
      style={{
        flex: 1,
        padding: baseUnit * 3,
      }}
    >
      <Text variant={"labelSmall"} style={{ color: colors.tertiary }}>
        {data.choices[0].message.content.trim().trim()}
      </Text>

      {assets && !error && (
        <Pressable
          onPress={() => {
            _handlePressButtonAsync("https://openai.com/")
          }}
          style={({ pressed }) => [
            {
              marginTop: baseUnit * 3,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Image
            style={{ opacity: 1 }}
            source={assets[0].localUri}
            width={2200 / 24}
            height={598 / 24}
          />
        </Pressable>
      )}
    </ScrollView>
  )
}

GPTResponse.propTypes = {
  route: PropTypes.object,
}

export default GPTResponse
