/*
  Spotify API
  Get Spotify catalog information for a single track identified by its unique Spotify ID.
  https://developer.spotify.com/documentation/web-api/
  reference/#/operations/get-track
*/

const SpotifyGetTrack = async (authToken, id) => {
  const url = `https://api.spotify.com/v1/tracks/${id}`
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
    return {
      name: null,
      artists: [{ name: null }],
      spotifyData: null,
    }
  }
}

export default SpotifyGetTrack
