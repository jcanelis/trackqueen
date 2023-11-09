/*
  Spotify API
  Get detailed profile information about the current user.
  https://developer.spotify.com/documentation/web-api/
  reference/users-profile/get-current-users-profile/
*/

const SpotifyGetMe = async (authToken) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = "me"
  const url = baseURL + endpoint

  try {
    let response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: ` Bearer ${authToken}`,
      },
    })
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default SpotifyGetMe
