const request = require("request")

// Google Cloud Functions v2
const { onRequest } = require("firebase-functions/v2/https")
const { defineSecret } = require("firebase-functions/params")

// Google Cloud Secret Manager
const spotify_client_id = defineSecret("SPOTIFY_CLIENT_ID")
const spotify_client_secret = defineSecret("SPOTIFY_CLIENT_SECRET")

exports.spotifyCallback2026 = onRequest(
  {
    secrets: [spotify_client_id, spotify_client_secret],
    cors: ["http://localhost:19006", "https://accounts.spotify.com"],
  },
  (req, res) => {
    const buffer = Buffer.from(
      `${spotify_client_id.value()}:${spotify_client_secret.value()}`
    )
    const bufferString = buffer.toString("base64")
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: req.body,
        redirect_uri: "com.jcanelis.tq22://auth/",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${bufferString}`,
      },
      json: true,
    }
    request.post(authOptions, (error, response, body) => {
      res.status(200).send({
        access_token: body.access_token,
        refresh_token: body.refresh_token,
      })
    })
  }
)
