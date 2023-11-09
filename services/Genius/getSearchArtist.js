/*
  Genius API
  The search capability covers all content hosted on Genius (all songs)
  https://docs.genius.com/#search-h2
*/

import Keys from "../../constants/Keys"

const GeniusSearchArtist = async (artist) => {
  const artistURI = encodeURIComponent(artist)
  const baseURL = "https://api.genius.com/"
  const endpoint = "search"
  const config = `?q=${artistURI}`
  const accessToken = `&access_token=${Keys.Genius}`

  try {
    let response = await fetch(baseURL + endpoint + config + accessToken, {
      method: "GET",
      mode: "cors",
    })
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default GeniusSearchArtist
