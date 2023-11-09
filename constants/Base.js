// Refer to this url for React Navigation theme documentation :
// https://reactnavigation.org/docs/themes

// SPACE
const baseUnit = 8
const verticalRhythm = 4

/*** COLORS ****/
const GOLD = "#977345"
// rgba, 151, 115, 69, 1

// Light
const light = "rgba(255, 255, 255, 1)"
const lightBackground = "rgba(230, 230, 230, 1)"

// Dark
const dark = "rgba(0, 0, 0, 1)"
const darkGrey = "rgba(24, 24, 24, 1)"

// Greys
const lightGrey = "rgba(240, 240, 240, 1)"
const mediumGrey = "rgba(0, 0, 0, 0.1)"

// Brands
const apiColors = {
  Genius: {
    yellow: "#ffff64",
  },
  Musixmatch: {
    orange: "#ff6050",
    pink: "#ff0E83",
    cranberry: "#d54262",
    cosmic: "#813867",
    bossanova: "#66336e",
    grape: "#341539",
    yellow: "#ffc208",
    violet: "#9013fe",
    blue: "#5677fc",
  },
  Spotify: {
    green: "#1db954",
    greenRGB: "30, 215, 96",
    black: "#191414",
    blackRGB: "25, 20, 20",
  },
  YouTube: {
    red: "#ff0000",
    black: "#282828",
  },
}

/*** OTHER ****/

const blurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj"
// https://blurha.sh/
// Ideally this would be specific to each image
// This is a hash image of the TrackQueen gradient

export {
  apiColors,
  blurhash,
  baseUnit,
  dark,
  darkGrey,
  GOLD,
  light,
  lightBackground,
  lightGrey,
  mediumGrey,
  verticalRhythm,
}
