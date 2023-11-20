import React, { useContext } from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import SpotifyContext from "../context/spotify"

// Screens
import ArtistListScreen from "../views/modals/ArtistListScreen"
import ArtistTracksScreen from "../views/modals/ArtistTracksScreen"
import DiscoverScreen from "../views/DiscoverScreen"
import GPTResponse from "../views/modals/GPTResponse"
import TrackListScreen from "../views/modals/TrackListScreen"

// Stack
import GPTStack from "./GPTStack"

// Components
import CustomNavigationBar from "../components/CustomNavigationBar"
import DetailNavigationBar from "../components/DetailNavigationBar"

const DiscoverStack = () => {
  const { currentlyPlaying } = useContext(SpotifyContext)
  const { artist } = currentlyPlaying
  const { track } = currentlyPlaying

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={`${track} by ${artist}`}
        component={DiscoverScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={`Similar to ${artist}`}
        component={ArtistListScreen}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name="Top Tracks"
        component={ArtistTracksScreen}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={`${track} TracksListScreen`}
        component={TrackListScreen}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={"Ask ChatGPT"}
        component={GPTStack}
        navigationKey={track}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />

      <Stack.Screen
        name={"Powered by GPT-4 API"}
        component={GPTResponse}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}

export default DiscoverStack
