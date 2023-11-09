/*
  YouTube API v3
  A commentThread resource contains information about a YouTube comment thread,
  which comprises a top-level comment and replies, if any exist, to that comment.
  https://developers.google.com/youtube/v3/docs/commentThreads
*/

import Keys from "../../constants/Keys"

const YouTubeComments = async (videoID, nextPageToken, order) => {
  const baseURL = "https://www.googleapis.com/youtube/v3/"
  const endpoint = "commentThreads"
  const config = `?part=snippet&&maxResults=10&order=${order}&pageToken=${nextPageToken}&textFormat=plainText&videoId=${videoID}`
  const accessToken = `&key=${Keys.YouTube}`

  try {
    let response = await fetch(baseURL + endpoint + config + accessToken, {
      method: "GET",
      mode: "cors",
    })
    let data = await response.json()
    const comments = data.error ? [] : data.items

    return { data: data, comments: comments }
  } catch (error) {
    console.error(error)

    return error
  }
}

export default YouTubeComments
