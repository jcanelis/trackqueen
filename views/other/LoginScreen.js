import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"

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
import { Heading, SubHeading, Wrapper } from "../../components/Basics"
import Spinner from "../../components/Spinner"
import SpotifyButton from "../../components/SpotifyButton"

// Paper
import { useTheme } from "react-native-paper"

// Design
import { GOLD } from "../../constants/Base"

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
          <Wrapper>
            <Heading>📀 👑</Heading>
            <Heading>Welcome to TrackQueen</Heading>
            <SubHeading>Learn more about your music.</SubHeading>
            <SpotifyButton func={promptAsync} text={"Login with Spotify"} />
          </Wrapper>
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
          <ActivityIndicator size="large" color={GOLD} />
        </View>
      )}
    </View>
  )
}

export default LoginScreen
