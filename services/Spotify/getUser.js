/*
  Spotify API
  Get public profile information about a Spotify user.
  https://developer.spotify.com/documentation/web-api/
  reference/users-profile/get-users-profile/
*/

const SpotifyUserSearch = async (user, authToken) => {
  const baseURL = "https://api.spotify.com/v1/"
  const endpoint = `users/${user}`
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

export default SpotifyUserSearch
