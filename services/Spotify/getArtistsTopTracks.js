/*
  Spotify API
  Get Spotify catalog information about an artist's top tracks by country.
  https://developer.spotify.com/documentation/web-api/
  reference/#/operations/get-an-artists-top-tracks
*/

const SpotifyArtistTopTracks = async (authToken, artistID) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "artists"
  const config = `/${artistID}/top-tracks?market=us`
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

export default SpotifyArtistTopTracks
