import React from "react"

// React Navigation
import { useTheme } from "@react-navigation/native"
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation"
// const Tabs = createBottomTabNavigator()
const Tabs = createNativeBottomTabNavigator()

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
import { grey, GOLD } from "../constants/Base"

const AppTabs = () => {
  const { dark, colors } = useTheme()

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        inactiveTintColor: GOLD,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: GOLD,
        // minimizeBehavior: "onScrollDown",
        lazy: false,
      })}
    >
      <Tabs.Screen
        name="About"
        component={AboutStack}
        options={{
          tabBarIcon: () => ({ sfSymbol: "info.circle" }),
        }}
      />
      <Tabs.Screen
        name="Lyrics"
        component={LyricsStack}
        options={{
          tabBarIcon: () => ({ sfSymbol: "music.note.list" }),
        }}
      />
      <Tabs.Screen
        name="Comments"
        component={CommentsStack}
        options={{
          tabBarIcon: () => ({ sfSymbol: "message.badge.waveform" }),
        }}
      />
      <Tabs.Screen
        name="Videos"
        component={VideoStack}
        options={{
          tabBarIcon: () => ({ sfSymbol: "video" }),
        }}
      />
      <Tabs.Screen
        name="Discover"
        component={DiscoverStack}
        options={{
          tabBarIcon: () => ({ sfSymbol: "infinity" }),
        }}
      />
    </Tabs.Navigator>
  )
}

export default AppTabs
