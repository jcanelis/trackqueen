/*
  Genius API
  An artist is how Genius represents the creator of one or more songs (or other
  documents hosted on Genius). It's usually a musician or group of musicians.
  https://docs.genius.com/#artists-h2
*/

import Keys from "../../constants/Keys"

const GeniusArtist = async (artistID) => {
  const baseURL = "https://api.genius.com/"
  const endpoint = `artists/`
  const config = `${artistID}?text_format=plain`
  const accessToken = `&access_token=${Keys.Genius}`

  try {
    let response = await fetch(baseURL + endpoint + config + accessToken, {
      method: "GET",
      mode: "cors",
    })
    let responseJSON = await response.json()

    return responseJSON.response
  } catch (error) {
    console.error(error)

    return error
  }
}

export default GeniusArtist
