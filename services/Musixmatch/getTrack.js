/*
  Musixmatch
  Get track data based on track title and artist
  https://developer.musixmatch.com/documentation/api-reference/matcher-track-get
*/

import Keys from "../../constants/Keys"

const MusixmatchGetTrack = async (artist, track) => {
  const artistURI = encodeURIComponent(artist)
  const trackURI = encodeURIComponent(track)
  const baseURL = "https://api.musixmatch.com/ws/1.1/"
  const endpoint = "matcher.track.get"
  const config = `?q_artist=${artistURI}&q_track=${trackURI}`
  const accessToken = `&apikey=${Keys.Musixmatch}`
  const url = baseURL + endpoint + config + accessToken

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
    })
    let responseJSON = await response.json()
    const musixMatchTrack = responseJSON.message.body.track

    return musixMatchTrack
  } catch (error) {
    console.error(error)

    return error
  }
}

export default MusixmatchGetTrack
