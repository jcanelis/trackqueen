import React from "react"
import { FlatList } from "react-native"
import PropTypes from "prop-types"

// Components
import Artist from "../components/Artist"

// Design
import { baseUnit } from "../constants/Base"

const ArtistList = ({ data }) => (
  <FlatList
    initialNumToRender={4}
    horizontal={true}
    pagingEnabled={false}
    contentContainerStyle={{
      paddingLeft: baseUnit * 3,
      gap: baseUnit * 4,
    }}
    data={data}
    keyExtractor={(item, index) => index}
    renderItem={({ item }) => <Artist item={item} />}
  />
)
ArtistList.propTypes = {
  data: PropTypes.array,
}

export default ArtistList
