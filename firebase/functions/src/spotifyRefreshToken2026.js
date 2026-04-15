const request = require("request")

// Google Cloud Functions v2
const { onRequest } = require("firebase-functions/v2/https")
const { defineSecret } = require("firebase-functions/params")

// Google Cloud Secret Manager
const spotify_client_id = defineSecret("SPOTIFY_CLIENT_ID")
const spotify_client_secret = defineSecret("SPOTIFY_CLIENT_SECRET")

exports.spotifyRefreshToken2026 = onRequest(
  {
    secrets: [spotify_client_id, spotify_client_secret],
    cors: ["http://localhost:19006", "https://accounts.spotify.com"],
  },
  (req, res) => {
    console.log(spotify_client_id.value())
    console.log(spotify_client_secret.value())
    const buffer = Buffer.from(
      `${spotify_client_id.value()}:${spotify_client_secret.value()}`
    )
    const bufferString = buffer.toString("base64")
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
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const refreshResponse = JSON.parse(body)
        const newToken = refreshResponse.access_token

        res.status(200).send({
          access_token: newToken,
        })
      }
    })
  }
)
