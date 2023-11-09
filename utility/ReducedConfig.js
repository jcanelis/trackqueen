const ReducedConfig = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        isSignedIn: true,
        userToken: action.token,
      }
    case "SIGN_IN":
      return {
        ...prevState,
        isSignedIn: true,
        userToken: action.token,
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        userToken: null,
        isSignedIn: false,
        currentlyPlaying: {
          track: null,
          artist: null,
          spotifyData: null,
        },
      }

    case "UPDATE_TOKEN_BOOTSTRAP":
      return {
        ...prevState,
        isSignedIn: true,
        userToken: action.token,
      }

    case "UPDATE_TRACK_BOOTSTRAP":
      return {
        ...prevState,
        appIsReady: action.appIsReady,
        isSignedIn: action.isSignedIn,
        userToken: action.token,
        currentlyPlaying: {
          track: action.track,
          artist: action.artist,
          spotifyData: action.spotifyData,
        },
      }
    case "UPDATE_TRACK":
      return {
        ...prevState,
        currentlyPlaying: {
          track: action.track,
          artist: action.artist,
          spotifyData: action.spotifyData,
        },
      }
  }
}

export default ReducedConfig
