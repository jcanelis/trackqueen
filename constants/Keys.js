// These are the keys needed for various APIs
// Ideally these would all be moved to the server (Google Cloud)

const Keys = {
  Acr: process.env.EXPO_PUBLIC_acr,
  AcrSecret: process.env.EXPO_PUBLIC_acrsecret,
  Genius: process.env.EXPO_PUBLIC_genius,
  GPT: process.env.EXPO_PUBLIC_gpt,
  Musixmatch: process.env.EXPO_PUBLIC_musixmatch,
  Spotify: process.env.EXPO_PUBLIC_spotify,
  YouTube: process.env.EXPO_PUBLIC_youtube,
}

export default Keys
