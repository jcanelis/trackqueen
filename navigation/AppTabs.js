import React from "react"

// React Navigation
import { createNativeBottomTabNavigator } from "@bottom-tabs/react-navigation"
const Tabs = createNativeBottomTabNavigator()

// Stacks
import AboutStack from "./AboutStack"
import LyricsStack from "./LyricsStack"
import CommentsStack from "./CommentsStack"
import VideoStack from "./VideoStack"
import DiscoverStack from "./DiscoverStack"

// Design
import { GOLD } from "../constants/Base"

const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={() => ({
        headerShown: false,
        inactiveTintColor: GOLD,
        tabBarActiveTintColor: GOLD,
        tabBarInactiveTintColor: GOLD,
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
