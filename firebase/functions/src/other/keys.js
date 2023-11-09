const Functions = require("firebase-functions")

// Google Cloud Secret Manager
// https://cloud.google.com/secret-manager/docs/creating-and-accessing-secrets
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager")
const client = new SecretManagerServiceClient()

// Spotify names from Google Secrets Manager
const client_id = Functions.config().secrets.names.spotify_client_id
const client_secret = Functions.config().secrets.names.spotify_client_secret

exports.GET_SPOTIFY_CLIENT_ID = async function () {
  try {
    const [version] = await client.accessSecretVersion({
      name: client_id,
    })

    return version.payload.data.toString()
  } catch (error) {
    console.log(error)

    return false
  }
}

exports.GET_SPOTIFY_CLIENT_SECRET = async function () {
  try {
    const [version] = await client.accessSecretVersion({
      name: client_secret,
    })

    return version.payload.data.toString()
  } catch (error) {
    console.log(error)

    return false
  }
}
