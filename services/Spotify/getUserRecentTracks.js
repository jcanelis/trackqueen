/*
  Spotify API
  Get tracks from the current user's recently played tracks.
  https://developer.spotify.com/documentation/web-api/
  reference/#/operations/get-recently-played
*/

const SpotifyUserRecentTracks = async (authToken, signal) => {
  const baseURL = "https://api.spotify.com/v1/me/player/recently-played"
  const limit = "?limit=20"
  const url = baseURL + limit

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${authToken}`,
      },
      signal,
    })
    let responseJSON = await response.json()

    return responseJSON.items
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyUserRecentTracks
