import React, { useContext, useEffect, useRef, useState } from "react"
import {
  Alert,
  ActivityIndicator,
  Button,
  Pressable,
  View,
} from "react-native"
import { useNavigation, useTheme, useFocusEffect } from "@react-navigation/native"
import { useQuery, useQueryClient } from "@tanstack/react-query"

// Expo UI
import { Button as ButtonExpoUI, Host, Text, RNHostView } from "@expo/ui/swift-ui"
import {
  buttonStyle,
  controlSize,
  tint,
  fixedSize,
} from "@expo/ui/swift-ui/modifiers"

// Expo
import {
  useAudioRecorder,
  AudioModule,
  setAudioModeAsync,
  RecordingPresets,
  requestRecordingPermissionsAsync,
} from "expo-audio"
import { Image } from "expo-image"
import { useAssets } from "expo-asset"
import * as WebBrowser from "expo-web-browser"

// Context
import SpotifyContext from "../../context/spotify"

// Services
import Identify from "../../services/ACRCloud/identify"
import SpotifyGetTrack from "../../services/Spotify/getTrack"
import TokenCheck from "../../services/Custom/checkToken"

// Components
import StatusText from "../../components/StatusText"

// Design
import { baseUnit, GOLD } from "../../constants/Base"

// Screen states
// "idle"       — default, show Start recording button
// "recording"  — actively recording, show Stop recording button
// "searching"  — audio sent to ACR, show Cancel button + spinner
// "not_found"  — ACR returned no match, show Start recording button

function SoundCheckScreen() {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const { updateTrack } = useContext(SpotifyContext)

  // User interface
  const { colors } = useTheme()
  const [permissionGranted, setPermissionGranted] = useState(false)

  // ACRCloud image + loader image
  const [assets, error] = useAssets([
    require("../../assets/brands/acrcloud/ACRCloud-white.png"),
    require("../../assets/loader.png"),
  ])

  if (error) { console.log(error) }

  // Single source of truth for what the screen is doing
  const [screenState, setScreenState] = useState("idle")

  // Reset state to idle whenever the screen is closed so the next open is clean.
  // Also reset the query so its isError/isSuccess flags don't re-trigger effects.
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setScreenState("idle")
        queryClient.resetQueries({ queryKey: ["Search-nearby-audio"] })
      }
    }, [queryClient])
  )

  // Ref to the auto-stop timer so it can be cleared on manual stop
  const timerIDRef = useRef(null)

  // Request permissions on mount (Android requires explicit request)
  useEffect(() => {
    async function requestPermission() {
      const { granted } = await requestRecordingPermissionsAsync()
      if (granted) {
        setPermissionGranted(true)
      }
    }
    requestPermission()
  }, [])

  useEffect(() => {
    ;(async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied")
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      })
    })()
  }, [])

  const audioRecorder = useAudioRecorder({
    ios: {
      extension: ".wav",
      audioQuality: RecordingPresets.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 16000,
      numberOfChannels: 1,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    android: {
      extension: ".m4a",
      outputFormat: RecordingPresets.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: RecordingPresets.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
  })

  // Returns a Promise that resolves after ms milliseconds, storing the timer
  // so it can be cancelled (cleared) externally.
  function timeout(ms) {
    return new Promise((resolve) => {
      const id = setTimeout(resolve, ms)
      timerIDRef.current = id
    })
  }

  // Handle browser for ACRCloud link
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url)
  }

  const soundCheckQuery = useQuery({
    queryKey: ["Search-nearby-audio"],
    queryFn: async ({ signal }) => {
      const audioSearch = new Promise((resolve, reject) => {
        async function init() {
          try {
            await setAudioModeAsync({
              allowsRecording: true,
              playsInSilentMode: true,
            })

            await audioRecorder.prepareToRecordAsync()
            audioRecorder.record()
            setScreenState("recording")
            await timeout(8000)
            await audioRecorder.stop()
            setScreenState("searching")

            await setAudioModeAsync({
              allowsRecording: true,
              playsInSilentMode: true,
            })

            const acrCloud = await Identify(audioRecorder.uri, signal)

            if (acrCloud.status.msg === "No result") {
              setScreenState("not_found")
              throw new Error("No track found in search.")
            } else if (acrCloud.status.code == 2004) {
              setScreenState("not_found")
              throw new Error("Status code 2004.")
            } else {
              const { spotify } = acrCloud.metadata.music[0].external_metadata
              const token = await TokenCheck()
              const data = SpotifyGetTrack(token, spotify.track.id)
              
              resolve(data)
            }
          } catch (error) {
            reject(error)
          }
        }
        init()
      })

      return audioSearch
    },
    refetchOnMount: false,
    enabled: false,
    retry: false,
  })

  // Handle query errors — transition to not_found
  useEffect(() => {
    if (soundCheckQuery.isError) {
      console.error("Error on query for SoundCheckScreen", soundCheckQuery.error)
      setScreenState("not_found")
    }
  }, [soundCheckQuery.isError, soundCheckQuery.error])

  // Handle query success — update context and navigate back
  useEffect(() => {
    if (soundCheckQuery.isSuccess && soundCheckQuery.data) {
      setScreenState("idle")
      updateTrack({
        track: soundCheckQuery.data.name,
        artist: soundCheckQuery.data.artists[0].name,
        spotifyData: soundCheckQuery.data,
      })
      navigation.goBack()
    }
  }, [soundCheckQuery.isSuccess, soundCheckQuery.data, navigation, updateTrack])

  // Stop recording early and return to idle — no ACR call is made
  function handleStopRecording() {
    // Clear the auto-stop timer so the query doesn't continue
    if (timerIDRef.current) {
      clearTimeout(timerIDRef.current)
      timerIDRef.current = null
    }
    audioRecorder.stop().catch(() => {})
    queryClient.cancelQueries({ queryKey: ["Search-nearby-audio"] })
    setScreenState("idle")
  }

  // Cancel the ACR search in progress and return to idle
  function handleCancelSearch() {
    queryClient.cancelQueries({ queryKey: ["Search-nearby-audio"] })
    setScreenState("idle")
  }

  // Start a new recording session
  function handleStartRecording() {
    queryClient.fetchQuery({ queryKey: ["Search-nearby-audio"] })
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      {permissionGranted && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: baseUnit * 2,
          }}
        >
        <View 
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: baseUnit * 2,
          }}
        >
          {screenState === "recording" && (
            <>
              <View style={{ padding: baseUnit * 2 }}>
                <ActivityIndicator size="large" color={GOLD} />
              </View>
              <StatusText content="Recording your audio..." />
            </>
          )}

          {screenState === "searching" && (
            <>
              <View style={{ padding: baseUnit * 2 }}>
                <ActivityIndicator size="large" color={GOLD} />
              </View>
              <StatusText content="Searching for the song..." />
            </>
          )}

          {screenState === "not_found" && (
            <StatusText content="Unable to identify the song." />
          )}

          {(screenState === "idle" || screenState === "not_found") && (
            <Host >
              <RNHostView matchContents>
                <ButtonExpoUI
                  label={"Start recording"}
                  onPress={() => handleStartRecording()}
                  modifiers={[
                    controlSize("extraLarge"),
                    buttonStyle("glassProminent"),
                    tint(GOLD),
                    fixedSize({
                      horizontal: true,
                      vertical: true,
                  }),
                ]}>
                  <Text>Start recording</Text>
                </ButtonExpoUI>
              </RNHostView>
            </Host>
          )}

          {screenState === "recording" && (
            <Button
              title="Stop recording"
              color={GOLD}
              onPress={handleStopRecording}
            />
          )}

          {screenState === "searching" && (
            <Button
              title="Cancel"
              color={GOLD}
              onPress={handleCancelSearch}
            />
          )}
          </View>

          <View
            style={{
              paddingBottom: baseUnit * 4,
            }}
          >
            <Pressable
              onPress={() => {
                _handlePressButtonAsync("https://www.acrcloud.com/")
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Image
                  style={{ opacity: 0.8 }}
                  source={assets[0].localUri}
                  width={500 / 7}
                  height={106 / 7}
                />
              </Pressable>
            
          </View>
        </View>
      )}
    </View>
  )
}

export default SoundCheckScreen
