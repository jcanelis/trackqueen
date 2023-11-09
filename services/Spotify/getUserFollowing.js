/*
  Spotify API
  Get the current user's followed artists.
  https://developer.spotify.com/documentation/web-api/
  reference/#/operations/get-followed
*/

const SpotifyUserFollowing = async (authToken) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "me/following"
  const config = "?type=artist"
  const limit = "&limit=50"
  const url = baseURL + endpoint + config + limit

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${authToken}`,
      },
    })
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyUserFollowing
