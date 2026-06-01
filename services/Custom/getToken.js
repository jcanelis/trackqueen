/*
  Spotify Authorization
  Get Access Token
  https://developer.spotify.com/documentation/web-api/tutorials/code-flow
*/

// local: "http://127.0.0.1:5001/trackqueen2022/us-central1/spotifyCallback2026-spotifyCallback2026"
// prod : "https://us-central1-trackqueen2022.cloudfunctions.net/spotifyCallback2026-spotifyCallback2026"

import { saveSecureValue } from "../../utility/SecureStore"

const SpotifyGetToken = async (authCode) => {
  try {
    let response = await fetch(
      "https://us-central1-trackqueen2022.cloudfunctions.net/spotifyCallback2026-spotifyCallback2026",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authCode }),
      }
    )
    let responseJSON = await response.json()
    const storeData = async () => {
      try {
        // Save the tokens
        await saveSecureValue("spotifyToken", responseJSON.access_token)
        await saveSecureValue("spotifyRefreshToken", responseJSON.refresh_token)

        // Save expiration
        const timeStamp = new Date().getTime()
        const expirationDate = JSON.stringify(timeStamp + 3600000)
        await saveSecureValue("tokenExpiration", expirationDate)
      } catch (error) {
        console.error(error)
      }
    }
    await storeData()

    return responseJSON.access_token
  } catch (error) {
    console.error(error)

    throw error
  }
}

export default SpotifyGetToken
