import React, { useContext } from "react"
import { Button } from "react-native"

// React Navigation
import { useTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import AuthContext from "../context/auth"

// Screens
import ProfileScreen from "../views/modals/ProfileScreen"

// Design
import { GOLD } from "../constants/Base"

const ProfileStack = () => {
  const { signOut } = useContext(AuthContext)
  const { dark, colors } = useTheme()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your recent tracks"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <Button
              title="Logout"
              onPress={() => {
                signOut()
              }}
              color={GOLD}
            />
          ),
          headerShown: true,
          headerTransparent: true,
          headerTintColor: colors.text,
          headerLargeTitle: true,
          headerLargeTitleStyle: { color: colors.text },
          headerBlurEffect: dark
            ? "systemChromeMaterialDark"
            : "systemUltraThinMaterial",
        }}
      />
    </Stack.Navigator>
  )
}
export default ProfileStack
