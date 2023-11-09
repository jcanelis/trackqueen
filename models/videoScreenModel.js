// Services
import SpotifyArtistTopTracks from "../services/Spotify/getArtistsTopTracks"
import TokenCheck from "../services/Custom/checkToken"
import YouTubeSearch from "../services/YouTube/getSearch"

// Utility
import Shuffle from "../utility/Shuffle"

const VideoScreenModel = async ({ artist, track, spotifyData }) => {
  try {
    const token = await TokenCheck()
    const artistID = spotifyData.artists[0].id
    const { tracks } = await SpotifyArtistTopTracks(token, artistID)

    // Get videos and shuffle
    const videoResults = await YouTubeSearch(2, artist, "")
    const videos = Shuffle(videoResults.items)

    // Get videos and shuffle
    const videoResultsInterviews = await YouTubeSearch(
      2,
      `${artist} interviews`,
      ""
    )
    const videosInterviews = Shuffle(videoResultsInterviews.items)

    // Get videos and shuffle
    const videoResultsLive = await YouTubeSearch(
      2,
      `${track} ${artist} live`,
      ""
    )
    const videosLive = Shuffle(videoResultsLive.items)

    // Get videos and shuffle
    const videoResultsReactions = await YouTubeSearch(
      2,
      `${track} ${artist} reaction`,
      ""
    )
    const videosReactions = Shuffle(videoResultsReactions.items)

    // Save the next page token for future requests
    const nextPageToken = videoResults.nextPageToken

    return {
      nextPageToken,
      tracks,
      videos,
      videosInterviews,
      videosLive,
      videosReactions,
    }
  } catch (error) {
    console.error("Error retrieving data in VideoScreenModel : \n", error)

    return error
  }
}

export default VideoScreenModel
