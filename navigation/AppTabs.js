import React from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
const Tabs = createBottomTabNavigator()

// Expo
import { BlurView } from "expo-blur"
import { Ionicons } from "@expo/vector-icons"

// Stacks
import AboutStack from "./AboutStack"
import LyricsStack from "./LyricsStack"
import CommentsStack from "./CommentsStack"
import VideoStack from "./VideoStack"
import DiscoverStack from "./DiscoverStack"

// Design
import { grey } from "../constants/Base"

const AppTabs = () => {
  const { dark, colors } = useTheme()

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName

          if (route.name === "About") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline"
          } else if (route.name === "Lyrics") {
            iconName = focused ? "musical-notes" : "musical-notes-outline"
          } else if (route.name === "Comments") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          } else if (route.name === "Videos") {
            iconName = focused ? "videocam" : "videocam-outline"
          } else if (route.name === "Discover") {
            iconName = focused ? "git-network-outline" : "git-network"
          }

          return <Ionicons name={iconName} size={27} color={color} />
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: grey,
        tabBarStyle: {
          position: "absolute",
          borderTopColor: "rgba(0,0,0,0.1)",
        },
        tabBarBackground: () => (
          <BlurView
            tint={dark ? "dark" : "default"}
            style={{
              height: 80,
            }}
            intensity={50}
          />
        ),
      })}
    >
      <Tabs.Screen name="About" component={AboutStack} />
      <Tabs.Screen name="Lyrics" component={LyricsStack} />
      <Tabs.Screen name="Comments" component={CommentsStack} />
      <Tabs.Screen name="Videos" component={VideoStack} />
      <Tabs.Screen name="Discover" component={DiscoverStack} />
    </Tabs.Navigator>
  )
}

export default AppTabs
