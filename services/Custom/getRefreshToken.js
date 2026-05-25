/*
  Custom Stuff:
  - Get the local refresh token.
  - Call Firebase Function to get new Spotify API tokens.
  - Save tokens locally.
*/

// local: "http://127.0.0.1:5001/trackqueen2022/us-central1/spotifyRefreshToken2026-spotifyRefreshToken2026"
// prod : "https://us-central1-trackqueen2022.cloudfunctions.net/spotifyRefreshToken2026-spotifyRefreshToken2026"

import { saveSecureValue, getSecureValue } from "../../utility/SecureStore"

const SpotifyRefreshToken = async (signal) => {
  try {
    const refreshToken = await getSecureValue("spotifyRefreshToken")
    let response = await fetch(
      `http://127.0.0.1:5001/trackqueen2022/us-central1/spotifyRefreshToken2026-spotifyRefreshToken2026`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
        signal,
      }
    )

    // Save token and expiration date.
    let authData = await response.json()
    const timeStamp = new Date().getTime()
    const expirationDate = JSON.stringify(timeStamp + 3600000)

    await saveSecureValue("spotifyToken", authData.access_token)
    await saveSecureValue("tokenExpiration", expirationDate)

    return authData.access_token
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyRefreshToken
