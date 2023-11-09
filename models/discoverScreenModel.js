import TokenCheck from "../services/Custom/checkToken"

// Services
import SpotifyArtistTopTracks from "../services/Spotify/getArtistsTopTracks"
import SpotifyGetSimilarArtists from "../services/Spotify/getSimilarArtists"
import SpotifyGetSimilarTracks from "../services/Spotify/getSimilarTracks"

// Utility
import Shuffle from "../utility/Shuffle"

const DiscoverScreenModel = async ({ spotifyData }) => {
  try {
    const token = await TokenCheck()

    // Get related artists from Spotify
    const artistID = spotifyData.artists[0].id
    const relatedArtistsData = await SpotifyGetSimilarArtists(token, artistID)

    // Get related tracks from Spotify
    const trackID = spotifyData.id
    const relatedTracks = await SpotifyGetSimilarTracks(token, trackID)

    // Get popular tracks from Spotify
    const { tracks } = await SpotifyArtistTopTracks(token, artistID)
    const artistTopTracks = tracks

    // Shuffe the related artists
    const relatedArtists = Shuffle(relatedArtistsData.artists)

    return {
      artistTopTracks,
      relatedArtists,
      relatedTracks,
    }
  } catch (error) {
    console.error("Error retrieving data in DiscoverScreenModel : \n", error)

    return error
  }
}

export default DiscoverScreenModel
