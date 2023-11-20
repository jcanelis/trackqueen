import React from "react"
import { Pressable, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import PropTypes from "prop-types"

// Expo
import { Image } from "expo-image"

// Paper
import { useTheme, Text } from "react-native-paper"

// Custom
import { blurhash, baseUnit } from "../constants/Base"

const ArtistLarge = ({ item, image }) => {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Top Tracks", {
          item: item,
          coverImage: image,
        })
      }}
      style={({ pressed }) => [
        {
          marginTop: baseUnit * 3,
          flex: 1,
          gap: baseUnit,
          alignItems: "center",
          width: width / 2.4,
          height: width / 2.4 + baseUnit * 5,
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Image
        source={image}
        placeholder={blurhash}
        transition={240}
        height={width / 2.4}
        width={width / 2.4}
        style={{ borderRadius: width / 2.4 }}
        accessibilityLabel={item.name}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode={"tail"}
        variant={"labelMedium"}
        style={{
          color: colors.tertiary,
          opacity: 0.75,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  )
}

ArtistLarge.propTypes = {
  item: PropTypes.object,
  image: PropTypes.string,
}

export default ArtistLarge
