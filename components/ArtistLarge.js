import React from "react"
import { Pressable, Text, useWindowDimensions } from "react-native"
import { useNavigation, useTheme } from "@react-navigation/native"
import { Image } from "expo-image"
import PropTypes from "prop-types"

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
          flex: 1,
          alignItems: "center",
          width: width / 2,
          height: width / 2,
          opacity: pressed ? 0.65 : 1,
        },
      ]}
    >
      <Image
        source={image}
        placeholder={blurhash}
        transition={240}
        height={width / 3}
        width={width / 3}
        style={{ borderRadius: width / 3 }}
        accessibilityLabel={item.name}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode={"tail"}
        style={{
          fontSize: baseUnit * 1.5,
          lineHeight: baseUnit * 4,
          fontWeight: 600,
          letterSpacing: -0.1,
          color: colors.text,
          opacity: 0.85,
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
