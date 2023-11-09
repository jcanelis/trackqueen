/*
  Genius API
  An annotation is a piece of content about a part of a document. The document
  may be a song (hosted on Genius) or a web page (hosted anywhere). The part of
  a document that an annotation is attached to is called a referent.
  https://docs.genius.com/#annotations-h2
*/

import Keys from "../../constants/Keys"

const GeniusAnnotations = async (trackID) => {
  const baseURL = "https://api.genius.com/"
  const endpoint = "referents"
  const config = `?song_id=${trackID}&text_format=plain&per_page=50`
  const accessToken = `&access_token=${Keys.Genius}`

  try {
    let response = await fetch(baseURL + endpoint + config + accessToken, {
      method: "GET",
      mode: "cors",
    })
    let responseJSON = await response.json()

    // Clean up annotations data
    let cleanData = responseJSON.response.referents
    cleanData.forEach((element, index) => {
      var cleanUp = cleanData[index].range.content
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase()
      cleanData[index].range.content = cleanUp
    })

    return cleanData
  } catch (error) {
    console.error(error)

    return error
  }
}

export default GeniusAnnotations
