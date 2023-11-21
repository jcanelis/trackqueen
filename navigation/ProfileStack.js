// import React, { useContext } from "react"
import React from "react"

// React Navigation
// https://reactnavigation.org/docs/native-stack-navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Stack = createNativeStackNavigator()

// Context
// import AuthContext from "../context/auth"

// Screens
import DetailNavigationBar from "../components/DetailNavigationBar"
import ProfileScreen from "../views/modals/ProfileScreen"

const ProfileStack = () => {
  // const { signOut } = useContext(AuthContext)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Your recent tracks"
        component={ProfileScreen}
        options={{
          header: (props) => <DetailNavigationBar {...props} />,
        }}
      />
    </Stack.Navigator>
  )
}
export default ProfileStack
