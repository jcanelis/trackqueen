import React, { useContext } from "react"
import { Button } from "react-native"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
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
        }}
      />
    </Stack.Navigator>
  )
}
export default ProfileStack
