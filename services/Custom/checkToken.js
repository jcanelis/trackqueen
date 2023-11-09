/*
  Custom Stuff:
  - Get the local tokens.
  - Check if auth token needs to be refreshed.
  - If a refresh is needed, call Firebase Function.
  - Return new tokens.
*/

import SpotifyRefreshToken from "./getRefreshToken"
import { getSecureValue } from "../../utility/SecureStore"

async function TokenCheck(signal) {
  try {
    const authToken = await getSecureValue("spotifyToken")
    const tokenExpirationString = await getSecureValue("tokenExpiration")
    const tokenExpiration = parseInt(tokenExpirationString, 10)

    const checkIfTokenExpired = () => {
      return new Date(tokenExpiration) < new Date()
    }
    const isExpired = checkIfTokenExpired(tokenExpiration)

    let token = isExpired ? await SpotifyRefreshToken(signal) : authToken

    return token
  } catch (error) {
    console.error(error)

    return error
  }
}

export default TokenCheck
