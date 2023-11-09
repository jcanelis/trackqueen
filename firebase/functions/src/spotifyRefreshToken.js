const Functions = require("firebase-functions")
const REQUEST = require("request")
const cors = require("cors")({
  origin: ["http://localhost:19006", "https://accounts.spotify.com"],
})
const Keys = require("./other/keys")

exports.spotifyRefreshToken = Functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Fetch TrackQueen's Spotify API keys from Google Secrets Manager
    // Create a buffer string for Spotify API authorization
    const spotify_client_id = await Keys.GET_SPOTIFY_CLIENT_ID()
    const spotify_client_secret = await Keys.GET_SPOTIFY_CLIENT_SECRET()
    const buffer = Buffer.from(`${spotify_client_id}:${spotify_client_secret}`)
    const bufferString = buffer.toString("base64")

    // Use the refresh token and authOptions to POST to Spotify
    // The response from that should contain the new token
    const refresh_token = req.body
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${bufferString}`,
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
    }

    REQUEST.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const refreshResponse = JSON.parse(body)
        const newToken = refreshResponse.access_token

        res.status(200).send({
          access_token: newToken,
        })
      }
    })
  })
})
