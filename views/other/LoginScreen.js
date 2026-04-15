import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, View } from "react-native"
import { useTheme } from "@react-navigation/native"

import * as WebBrowser from "expo-web-browser"

// Expo
import { useAuthRequest } from "expo-auth-session"

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

// Design
import { GOLD } from "../../constants/Base"

WebBrowser.maybeCompleteAuthSession()

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
      redirectUri: "com.jcanelis.tq22://auth/",
    },
    endpoints
  )

  useEffect(() => {
    async function getAccessToken(authCode) {
      try {
        setLoading(true)
        const accessToken = await SpotifyGetToken(authCode)
        setLoading(false)
        authContext.signIn(accessToken)
      } catch (error) {
        console.error(error)
      }
    }

    if (response?.type === "success") {
      const { code } = response.params
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
            <View style={{ padding: 16 }}>
              <SpotifyButton text={"Login with Spotify"} func={promptAsync} />
            </View>
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
