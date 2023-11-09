/*
  Spotify API
  Get a list of similar tracks.
  https://developer.spotify.com/console/get-recommendations/
*/

const SpotifyGetSimilarTracks = async (authToken, trackID) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "recommendations"
  const config = `?seed_tracks=${trackID}&limit=15`
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

export default SpotifyGetSimilarTracks
