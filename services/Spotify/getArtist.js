/*
  Spotify API
  Get Artist
  https://developer.spotify.com/documentation/web-api/
  reference/get-an-artist
*/

import { getSecureValue } from "../../utility/SecureStore"

const SpotifyArtist = async (artistID) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = `artists/${artistID}`
  const userToken = await getSecureValue("spotifyToken")
  const url = baseURL + endpoint
  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${userToken}`,
      },
    })
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyArtist
