/*
  Spotify API
  Get Album Tracks
  https://developer.spotify.com/documentation/web-api/
  reference/#/operations/get-an-album
*/

import { getSecureValue } from "../../utility/SecureStore"

const SpotifyAlbumTracks = async (albumID) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = `albums/${albumID}`
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

export default SpotifyAlbumTracks
