/*
  Spotify API
  Get a list of the artist's related artists.
  https://developer.spotify.com/console/get-artist-related-artists/
*/

const SpotifyGetSimilarArtists = async (authToken, artistID) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "artists"
  const config = `/${artistID}/related-artists`
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

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyGetSimilarArtists
