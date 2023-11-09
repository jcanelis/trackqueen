/*
  Spotify API
  Get a list of the playlists owned or followed by a Spotify user.
  https://developer.spotify.com/documentation/web-api/
  reference/playlists/get-list-users-playlists/
*/

const SpotifyGetTopTracks = async (authToken, time_range) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "me/top/tracks"
  const config = `?time_range=${time_range}&limit=49`
  const url = baseURL + endpoint + config

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

    return responseJSON.tracks
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyGetTopTracks
