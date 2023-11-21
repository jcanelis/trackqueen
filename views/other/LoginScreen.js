import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

// Paper
import { Button, useTheme, Text } from "react-native-paper"

// Expo
import { makeRedirectUri, useAuthRequest } from "expo-auth-session"

// Context
import AuthContext from "../../context/auth"

// Services
import SpotifyGetToken from "../../services/Custom/getToken"

// Constants
import Keys from "../../constants/Keys"
import spotifyAuthScopes from "../../constants/SpotifyAuthScopes"

// Components
import Spinner from "../../components/Spinner"

// Design
import { baseUnit, verticalRhythm } from "../../constants/Base"

function LoginScreen() {
  const { colors } = useTheme()
  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const endpoints = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  }

  // Expo AuthSession: https://docs.expo.dev/versions/latest/sdk/auth-session/
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: `${Keys.Spotify}`,
      scopes: spotifyAuthScopes,
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: "tq22",
      }),
    },
    endpoints
  )

  useEffect(() => {
    async function getAccessToken(authCode) {
      try {
        setLoading(true)
        // Fetch token from Google Cloud using Spotify login data
        const accessToken = await SpotifyGetToken(authCode)
        setLoading(false)

        // Update app root state with user token
        authContext.signIn(accessToken)
      } catch (error) {
        console.error(error)
      }
    }

    if (response?.type === "success") {
      const { code } = response.params
      // Send data from the results of user Spotify login to handler function
      getAccessToken(code)
    }
  }, [response, authContext, request])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {!loading && (
        <>
          <Spinner />

          <View
            style={{
              gap: baseUnit * 4,
              padding: baseUnit * 4,
              alignItems: "center",
            }}
          >
            <View
              style={{
                gap: verticalRhythm * 2,
                alignItems: "center",
              }}
            >
              <Text variant="titleLarge">Play a song with Spotify</Text>
              <Text variant="titleMedium"> Pull down to refresh.</Text>
            </View>

            <Button
              icon={"spotify"}
              mode={"outlined"}
              accessibilityLabel={"Open Spotify"}
              textColor={colors.onSecondaryContainer}
              rippleColor={colors.tertiary}
              onPress={() => promptAsync()}
            >
              Open Spotify
            </Button>
          </View>
        </>
      )}

      {loading && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={colors.tertiary} />
        </View>
      )}
    </View>
  )
}

export default LoginScreen
