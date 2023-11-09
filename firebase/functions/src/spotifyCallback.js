const Functions = require("firebase-functions")
const REQUEST = require("request")
const cors = require("cors")({
  origin: ["http://localhost:19006", "https://accounts.spotify.com"],
})

const Keys = require("./other/keys")

exports.spotifyCallback = Functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Fetch Spotify API keys from Google Secrets Manager
    const spotify_client_id = await Keys.GET_SPOTIFY_CLIENT_ID()
    const spotify_client_secret = await Keys.GET_SPOTIFY_CLIENT_SECRET()

    // Create a buffer string for Spotify API authorization
    const buffer = Buffer.from(`${spotify_client_id}:${spotify_client_secret}`)
    const bufferString = buffer.toString("base64")

    // Send a POST to Spotify with the authorization code received from client
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: req.body,
        redirect_uri: "tq22://",
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${bufferString}`,
      },
      json: true,
    }

    REQUEST.post(authOptions, (error, response, body) => {
      res.status(200).send({
        access_token: body.access_token,
        refresh_token: body.refresh_token,
      })
    })
  })
})
