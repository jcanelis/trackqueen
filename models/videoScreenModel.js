// Services
import YouTubeSearch from "../services/YouTube/getSearch"

const VideoScreenModel = async ({ artist, track }) => {
  try {
    // Fetch live performances of the track
    const performancesSearch = await YouTubeSearch(
      2,
      `${track} ${artist} live`,
      ""
    )
    const performances = performancesSearch.items

    // Fetch interviews with the artist
    const interviewsSearch = await YouTubeSearch(2, `${artist} interviews`, "")
    const interviews = interviewsSearch.items

    // Fetch reactions to the track
    const reactionsSearch = await YouTubeSearch(
      2,
      `${track} ${artist} reactions`,
      ""
    )
    const reactions = reactionsSearch.items

    // Save the next page token for future requests
    // The token is the same for all of the queries
    const nextPageToken = performancesSearch.nextPageToken

    return {
      performances,
      interviews,
      reactions,
      nextPageToken,
    }
  } catch (error) {
    console.error("Error retrieving data in VideoScreenModel : \n", error)

    return error
  }
}

export default VideoScreenModel
