/*
  Spotify API
  Get the object currently being played on the user’s Spotify account.
  https://developer.spotify.com/documentation/web-api/
  reference/player/get-the-users-currently-playing-track/
*/

const SpotifyCurrentTrack = async (authToken, signal) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "me/player/currently-playing"
  const url = baseURL + endpoint

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

    if (responseJSON.item) {
      if (responseJSON.item.name.indexOf(" (") > -1) {
        responseJSON.item.name = responseJSON.item.name.substring(
          0,
          responseJSON.item.name.indexOf(" (")
        )
      } else if (responseJSON.item.name.indexOf(" -") > -1) {
        responseJSON.item.name = responseJSON.item.name.substring(
          0,
          responseJSON.item.name.indexOf(" -")
        )
      }
    }

    return responseJSON.item
  } catch (error) {
    console.error(error)
    return {
      name: null,
      artists: [{ name: null }],
      spotifyData: null,
    }
  }
}

export default SpotifyCurrentTrack
