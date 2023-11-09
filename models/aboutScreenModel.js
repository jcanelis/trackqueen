// Services
import GeniusCleanUp from "../services/Genius/cleanUp"
import GeniusTrack from "../services/Genius/getSong"
import SpotifyAlbumTracks from "../services/Spotify/getAlbumTracks"
import SpotifyArtist from "../services/Spotify/getArtist"

// Duplicates
import GeniusSearch from "../services/Genius/getSearch"

const AboutScreenModel = async ({ track, artist, spotifyData }) => {
  try {
    // Get all of the artists and fetch their data
    const artists = await Promise.all(
      spotifyData.artists.map(async (artist) => {
        const response = await SpotifyArtist(artist.id)

        return response
      })
    )

    // Get album
    const albumID = spotifyData.album.id
    const spotifyAlbumData = await SpotifyAlbumTracks(albumID)
    const geniusSearchData = await GeniusSearch(artist, track)

    // Is there a result on Genius?
    const geniusTrackID =
      geniusSearchData.response.hits.length > 0
        ? geniusSearchData.response.hits[0].result.id
        : null

    // If a result was received, use the ID of the first result and get data
    const geniusTrackData =
      geniusTrackID != null ? await GeniusTrack(geniusTrackID) : null

    // Setup Genius track data
    const geniusData =
      geniusSearchData.response.hits.length > 0
        ? geniusSearchData.response.hits[0]
        : null

    // Setup track description
    const description =
      geniusTrackData != null
        ? await GeniusCleanUp(geniusTrackData)
        : "No track description found from Genius.com."

    const writers =
      geniusTrackData !== null
        ? geniusTrackData.response.song.writer_artists
        : []

    const producers =
      geniusTrackData !== null
        ? geniusTrackData.response.song.producer_artists
        : []

    const authors =
      geniusTrackData !== null
        ? geniusTrackData.response.song.description_annotation.annotations[0]
        : []

    return {
      artists,
      authors,
      description,
      geniusData,
      producers,
      spotifyAlbumData,
      writers,
    }
  } catch (error) {
    console.error("Error retrieving data in AboutScreenData : \n", error)

    return error
  }
}

export default AboutScreenModel
