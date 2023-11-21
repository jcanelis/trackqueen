import React from "react"
import { Pressable, useWindowDimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Image } from "expo-image"
import PropTypes from "prop-types"

// Paper
import { useTheme, Text } from "react-native-paper"

// Design
import { blurhash, baseUnit } from "../constants/Base"

const Artist = ({ item }) => {
  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const navigation = useNavigation()

  if (item.images.length < 1) {
    return null
  }
  if (item.images.length > 0) {
    const imageURL = item.images[1].url
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Top Tracks", {
            item: item,
            coverImage: imageURL,
          })
        }}
        style={({ pressed }) => [
          {
            alignItems: "center",
            width: width / 5,
            height: width / 5 + baseUnit * 5,
            opacity: pressed ? 0.4 : 1,
          },
        ]}
      >
        <Image
          source={imageURL}
          placeholder={blurhash}
          transition={250}
          height={width / 5}
          width={width / 5}
          style={{ borderRadius: width / 4 }}
          accessibilityLabel={item.name}
        />
        <Text
          variant={"labelSmall"}
          numberOfLines={1}
          ellipsizeMode={"tail"}
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
}

Artist.propTypes = {
  item: PropTypes.object,
}

export default Artist
