import React, { useContext, useEffect, useRef, useState } from "react"
import {
  Alert,
  ActivityIndicator,
  Button,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

// Utility
// import audioConfig from "../../constants/AudioConfig"

// Components
import StatusText from "../../components/StatusText"

// Design
import { baseUnit, GOLD } from "../../constants/Base"

function SoundCheckScreen() {
  const navigation = useNavigation()
  const queryClient = useQueryClient()
  const spotifyContext = useContext(SpotifyContext)

  // User interface
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const animationRef = useRef(null)
  const [permissionGranted, setPermissionGranted] = useState(false)

  // ACRCloud image
  // https://docs.expo.dev/versions/latest/sdk/asset/
  const [assets, error] = useAssets([
    require("../../assets/brands/acrcloud/ACRCloud-white.png"),
    require("../../assets/loader.png"),
  ])

  // if required on Android, request recording permissions
  useEffect(() => {
    async function requestPermission() {
      const { granted } = await requestRecordingPermissionsAsync()
      if (granted) {
        console.log("Permission granted")
        setPermissionGranted(true)
      }
    }

    requestPermission()
  }, [])

  // Updated during the recording progress
  const initialRecordingStatus = {
    canRecord: false,
    durationMillis: 0,
    isDoneRecording: true,
    isRecording: false,
  }
  const [statusObject, setStatusObject] = useState(initialRecordingStatus)

  // A reference to the recording
  const [recording, setRecording] = useState(null)

  const audioRecorder = useAudioRecorder({
    ios: {
      extension: ".wav",
      audioQuality: RecordingPresets.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 8000,
      numberOfChannels: 1,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: true,
    },
  })
  // const recorderState = useAudioRecorderState(audioRecorder)

  // A recording timer ID for cancelling when needed.
  // const [timerID, setTimerID] = useState(1)

  // Is data being fetched from the API service
  const [fetchingData, setFetchingData] = useState(false)

  // Did the search not find anything
  const [failed, setFailed] = useState(false)

  // Handle browser for ACRCloud link
  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url)
  }

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

  useEffect(() => {
    // If recording, stop the recording
    // If a recording exists, cancel the API query
    return recording
      ? async () => {
          try {
            // Stop the animation
            animationRef.current?.pause()

            // Get the status of the recording
            const recordingStatus = await recording.getStatusAsync()
            if (!recordingStatus.isDoneRecording) {
              await recording.stopAndUnloadAsync()
            }

            // Turn off device recordings
            await setAudioModeAsync({
              allowsRecording: true,
              playsInSilentMode: true,
            })

            // Cancel the query wrapper
            queryClient.cancelQueries({ queryKey: ["Search-nearby-audio"] })

            setRecording(null)
            setFetchingData(false)
          } catch (error) {
            console.error(error)
          }
        }
      : () => true
  }, [queryClient, recording])

  function timeout(ms) {
    return new Promise((resolve) => {
      const daID = setTimeout(resolve, ms)
      setTimerID(daID)
    })
  }

  useQuery({
    queryKey: ["Search-nearby-audio"],
    queryFn: async ({ signal }) => {
      const audioSearch = new Promise((resolve, reject) => {
        async function init() {
          try {
            if (failed) {
              setFailed(false)
            }

            await setAudioModeAsync({
              allowsRecording: true,
              playsInSilentMode: true,
            })

            const record = async () => {
              console.log("Starting to record...")
              await audioRecorder.prepareToRecordAsync(
                RecordingPresets.HIGH_QUALITY
              )
              audioRecorder.record()
            }

            record()

            const stopRecording = async () => {
              console.log("Stop recording...")
              await audioRecorder.stop()
            }

            await timeout(5000)

            stopRecording()

            await setAudioModeAsync({
              allowsRecording: true,
              playsInSilentMode: true,
            })

            setFetchingData(true)

            console.log("audioRecorder", audioRecorder)

            const acrCloud = await Identify(audioRecorder.uri, signal)

            console.log("acrCloud", acrCloud)
            console.log("acrCloud STATUS", acrCloud.status)

            if (acrCloud.status.msg === "No result") {
              setFailed(true)
              throw new Error("No track found in search.")
            } else if (acrCloud.status.code == 2004) {
              setFailed(true)
              throw new Error("Status code 2004.")
            } else {
              const { spotify } = acrCloud.metadata.music[0].external_metadata
              const token = await TokenCheck()
              const data = SpotifyGetTrack(token, spotify.track.id)
              setFailed(false)
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
    keepPreviousData: false,
    enabled: false,
    retry: false,
    onError: (error) => {
      console.error("Error on query for SoundCheckScreen", error)
      animationRef.current?.pause()
      setFetchingData(false)
      setRecording(null)
      setFailed(true)
    },
    onSuccess: (data) => {
      animationRef.current?.pause()
      setFetchingData(false)
      setRecording(null)
      spotifyContext.updateTrack({
        track: data.name,
        artist: data.artists[0].name,
        spotifyData: data,
      })
      navigation.goBack()
    },
  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          flex: 1.6,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          {assets && (
            <Image
              style={{ width: width / 2.4, height: width / 2.4 }}
              source={assets[1].localUri}
            />
          )}
        </Pressable>
      </View>

      {permissionGranted && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            padding: baseUnit * 2,
          }}
        >
          {statusObject.isRecording ? (
            <StatusText content={"Listening to your audio..."} />
          ) : null}

          {fetchingData && !failed ? (
            <View style={{ padding: baseUnit * 2 }}>
              <ActivityIndicator size="large" color={GOLD} />
            </View>
          ) : null}

          {fetchingData && !failed ? (
            <StatusText content={"Searching database..."} />
          ) : null}

          {!fetchingData && failed ? (
            <StatusText content={"Unable to find a song with your audio..."} />
          ) : null}

          {permissionGranted ? (
            <Button
              title={"Start recording"}
              color={GOLD}
              onPress={() => {
                animationRef.current?.play()
                queryClient.fetchQuery({
                  queryKey: ["Search-nearby-audio"],
                })
              }}
            />
          ) : (
            <Button title="Enable audio recording" color={GOLD} />
          )}

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
              padding: baseUnit * 3,
            }}
          >
            {assets && !error && (
              <Pressable
                onPress={() => {
                  _handlePressButtonAsync("https://www.acrcloud.com/")
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Image
                  style={{ opacity: 0.8 }}
                  source={assets[0].localUri}
                  width={500 / 7}
                  height={106 / 7}
                />
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default SoundCheckScreen
