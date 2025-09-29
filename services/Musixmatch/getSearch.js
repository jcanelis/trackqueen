/*
  Musixmatch
  Get the lyrics for track based on title and artist
  https://developer.musixmatch.com/documentation/api-reference/matcher-lyrics-get
*/

import Keys from "../../constants/Keys"

const MusixmatchSearch = async (artist, track) => {
  const artistURI = encodeURIComponent(artist)
  const trackURI = encodeURIComponent(track)
  const baseURL = "https://api.musixmatch.com/ws/1.1/"
  const endpoint = "matcher.lyrics.get"
  const config = `?q_artist=${artistURI}&q_track=${trackURI}`
  const accessToken = `&apikey=${Keys.Musixmatch}`
  const url = baseURL + endpoint + config + accessToken

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
    })
    let responseJSON = await response.json()
    const lyricsData = responseJSON

    // Clean up lyrics data
    let newLyrics
    if (responseJSON.message.header.status_code !== 404) {
      newLyrics = responseJSON.message.body.lyrics.lyrics_body.split("\n")

      if (newLyrics.length < 1) {
        newLyrics = []
      }
    }

    const lyrics = newLyrics

    return { lyrics, lyricsData }
  } catch (error) {
    console.error(error)

    return error
  }
}

export default MusixmatchSearch
