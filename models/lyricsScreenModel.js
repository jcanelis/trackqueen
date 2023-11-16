// Services

// Genius
import GeniusArtist from "../services/Genius/getArtist"
import GeniusAnnotations from "../services/Genius/getAnnotations"
import GeniusSearch from "../services/Genius/getSearch"

// Musixmatch
import MusixmatchSearch from "../services/Musixmatch/getSearch"
import MusixmatchGetTrack from "../services/Musixmatch/getTrack"

// Spotify
import SpotifyArtist from "../services/Spotify/getArtist"

const LyricsScreenModel = async ({ track, artist, spotifyData }) => {
  try {
    // Get data about this artist from Spotify
    const spotifyArtistData = await SpotifyArtist(spotifyData.artists[0].id)

    // Fetch lyrics from Musixmatch
    const { lyrics, lyricsData } = await MusixmatchSearch(artist, track)

    // This gets a URL to send the user to the Musixmatch website
    const musixMatchTrack = await MusixmatchGetTrack(artist, track)

    // Search Genius for the track
    const geniusTrackSearch = await GeniusSearch(artist, track)

    const artistId =
      geniusTrackSearch.response.hits.length > 0
        ? geniusTrackSearch.response.hits[0].result.primary_artist.id
        : null

    // Fetch artist info from Genius
    const artistInfo = artistId !== null ? await GeniusArtist(artistId) : null

    // If we got a result from Genius, fetch annotations
    // Setup the annotations array
    let annotations = []
    let geniusTrackData = null

    if (geniusTrackSearch.response.hits.length > 0) {
      // Get all of the annotations
      const geniusTrackID = geniusTrackSearch.response.hits[0].result.id
      annotations = await GeniusAnnotations(geniusTrackID)

      // Get the verified annotations
      const verifiedAnnotations = annotations.filter(
        (annotation) => annotation.annotations[0].verified
      )

      // Get the other annotations
      const userAnnotations = annotations.filter(
        (annotation) => !annotation.annotations[0].verified
      )

      // Merge lists with verified first
      annotations = verifiedAnnotations.concat(userAnnotations)
      geniusTrackData = geniusTrackSearch.response.hits[0].result
    }

    // Pass along extra data from Genius if available
    const initialBio =
      artistInfo !== null ? artistInfo.artist.description.plain : null
    // Sometimes Genius provides a string with a question mark as the bio
    const bio = initialBio === "?" ? null : initialBio

    const instagram =
      artistInfo !== null ? artistInfo.artist.instagram_name : null

    return {
      artistInfo: artistInfo,
      annotations: annotations,
      bio: bio,
      geniusTrackData: geniusTrackData,
      geniusTrackSearch: geniusTrackSearch.response.hits[0],
      instagram: instagram,
      lyrics: lyrics,
      lyricsData: lyricsData,
      musixMatchTrack: musixMatchTrack,
      spotifyArtistData: spotifyArtistData,
    }
  } catch (error) {
    console.error("Error retrieving data in LyricsScreenModel : \n", error)

    return error
  }
}

export default LyricsScreenModel
