const Admin = require("firebase-admin")
Admin.initializeApp()

exports.spotifyCallback = require("./src/spotifyCallback")
exports.spotifyRefreshToken = require("./src/spotifyRefreshToken")
