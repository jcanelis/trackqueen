// Services
import SpotifyGetMe from "../services/Spotify/getMe"
import SpotifyGetUserRecentTracks from "../services/Spotify/getUserRecentTracks"
import TokenCheck from "../services/Custom/checkToken"

const ProfileScreenModel = async (signal) => {
  try {
    const token = await TokenCheck()
    const user = await SpotifyGetMe(token)
    const recentTracks = await SpotifyGetUserRecentTracks(token, signal)

    return {
      user,
      recentTracks,
    }
  } catch (error) {
    console.error("Error retrieving data in ProfileScreenModel : \n", error)

    return false
  }
}

export default ProfileScreenModel
