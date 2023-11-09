import React from "react"
import { FlatList } from "react-native"
import PropTypes from "prop-types"

// Components
import Artist from "../components/Artist"

// Design
import { baseUnit } from "../constants/Base"

const ArtistList = ({ data }) => (
  <FlatList
    scrollToOverflowEnabled={false}
    horizontal={true}
    directionalLockEnabled={true}
    pagingEnabled={false}
    estimatedItemSize={5}
    contentContainerStyle={{
      paddingLeft: baseUnit * 3,
      gap: baseUnit * 4,
    }}
    initialNumToRender={4}
    data={data}
    keyExtractor={(item, index) => index}
    renderItem={({ item }) => <Artist item={item} />}
  />
)
ArtistList.propTypes = {
  data: PropTypes.array,
}

export default ArtistList
