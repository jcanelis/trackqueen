/*
  YouTube API v3
  A search result contains information about a YouTube video, channel, or
  playlist that matches the search parameters specified in an API request.
  https://developers.google.com/youtube/v3/docs/search
*/

import Keys from "../../constants/Keys"

const YouTubeSearch = async (limit, query, nextPageToken) => {
  const queryURI = encodeURIComponent(query)
  const baseURL = "https://www.googleapis.com/youtube/v3/"
  const endpoint = "search"
  const config = `?part=snippet&order=relevance&q=${queryURI}`
  const limiter = `&maxResults=${limit}&pageToken=${nextPageToken}`

  const accessToken = `&key=${Keys.YouTube}`
  try {
    let response = await fetch(
      baseURL + endpoint + config + limiter + accessToken,
      {
        method: "GET",
        mode: "cors",
      }
    )
    let data = await response.json()

    return data
  } catch (error) {
    console.error("YouTubeSearch error \n ", error)
    return error
  }
}

export default YouTubeSearch
