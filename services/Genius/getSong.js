/*
  Genius API
  A song is a document hosted on Genius. It's usually music lyrics.
  Data for a song includes details about the document itself and information about
  all the referents that are attached to it, including the text to which they refer.
  https://docs.genius.com/#songs-h2
*/

import Keys from "../../constants/Keys"

const GeniusTrack = async (trackID) => {
  const baseURL = "https://api.genius.com/"
  const endpoint = `songs/${trackID}`
  const config = "?text_format=plain"
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

export default GeniusTrack
