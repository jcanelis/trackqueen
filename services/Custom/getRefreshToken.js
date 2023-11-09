/*
  Custom Stuff:
  - Get the local refresh token.
  - Call Firebase Function to get new Spotify API tokens.
  - Save tokens locally.
*/

import { saveSecureValue, getSecureValue } from "../../utility/SecureStore"

const SpotifyRefreshToken = async (signal) => {
  try {
    const refreshToken = await getSecureValue("spotifyRefreshToken")
    let response = await fetch(
      `https://us-central1-trackqueen2022.cloudfunctions.net/spotifyRefreshToken-spotifyRefreshToken`,
      {
        method: "POST",
        mode: "cors",
        body: `${refreshToken}`,
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
