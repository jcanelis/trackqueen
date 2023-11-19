import React, { useContext } from "react"
import { Button } from "react-native"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
import AuthContext from "../context/auth"

// Screens
import CustomNavigationBar from "../components/CustomNavigationBar"
import ProfileScreen from "../views/modals/ProfileScreen"

// Design
import { GOLD } from "../constants/Base"

const ProfileStack = () => {
  const { signOut } = useContext(AuthContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Your recent tracks"
        component={ProfileScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
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
