[![update](https://github.com/jcanelis/trackqueen/actions/workflows/update.yml/badge.svg)](https://github.com/jcanelis/trackqueen/actions/workflows/update.yml)

# TrackQueen

## Learn more about your music.

TrackQueen gives you analysis, background info, comments, lyrics, videos and other content about your currently playing song.

### Content APIs

TrackQueen uses several APIs to collect its content:

- [Spotify](https://developer.spotify.com/documentation/web-api/reference/#/)
- [Musixmatch](https://developer.musixmatch.com)
- [YouTube](https://developers.google.com/youtube/v3)
- [Genius](https://docs.genius.com)
- [ChatGPT (OpenAI)](https://platform.openai.com/docs/guides/gpt)
- [ACRCloud](https://www.acrcloud.com/music-recognition/)

### Brand Guidelines

For each API, it's important to follow the respective branding guidelines for how to properly display the content. [Spotify](https://developer.spotify.com/documentation/general/design-and-branding/), [ACRCloud](https://docs.acrcloud.com/faq/definition-of-terms#brand-exposure), [ChatGPT (OpenAI)](https://openai.com/brand), [Musixmatch](https://about.musixmatch.com/brand-resources), and [YouTube](https://developers.google.com/youtube/terms/branding-guidelines) have documentation on how to display their brand assets. [Genius](https://genius.com/static/terms) doesn't appear to currently allow the display of their logo.

## Development

TrackQueen is built using:

- [Expo](https://expo.io/)
- [React Native](https://facebook.github.io/react-native/)
- [React Navigation](https://reactnavigation.org/)
- [TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
- [Google Cloud Functions for Firebase](https://firebase.google.com/products/functions)

### Getting Started

1. Clone this repo: `git clone https://github.com/jcanelis/trackqueen.git`
2. Install [NVM](https://github.com/nvm-sh/nvm) `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
3. Set Node version: `nvm use 22.11.0`
4. Install dependencies by running `yarn` within the repo.
5. Install Expo CLI: `yarn global add expo-cli`
6. Start development: `yarn start` or `npx expo start`

### Cloud Functions for Firebase

[Cloud Functions for Firebase](https://firebase.google.com/docs/functions) is used to create microservices with Node.js. These are used for things like authenticating users with Spotify's API and getting refresh tokens. This is the “back-end” of TrackQueen.

#### Getting Started

- Install the [Firebase CLI](https://firebase.google.com/docs/cli#mac-linux-auto-script) with `curl -sL https://firebase.tools | bash`
- Connect the app by running: `firebase init`.

#### Local Development

The [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) is used to develop locally. Use this to call a microservice or test other Firebase functionality. Start the emulator(s) by running `firebase emulators:start`. Learn more [here](https://firebase.google.com/docs/emulator-suite/connect_and_prototype).

#### Deploy Functions

- Updating functions: `firebase deploy --only functions`
- Update specific function: `firebase deploy --only functions:refreshToken`

#### Secrets

TrackQueen uses Google Cloud [Secret Manager](https://cloud.google.com/functions/docs/configuring/secrets) to store API keys.

- Get secret value `firebase functions:secrets:access KEY_NAME@latest`
- Change secret value `firebase functions:secrets:set SECRET_NAME`
- Destroy secret value `firebase functions:secrets:destroy SECRET_NAME`

#### Environment Variables

- Set variable: `firebase functions:config:set stripe.password="12345"`
- Get all variables: `firebase functions:config:get`
- Remove variables: `firebase functions:config:unset key1 key2`
- Switch to local variables `firebase functions:config:get > .runtimeconfig.json`

## Create Builds

### Development builds

Create a [development build](https://docs.expo.dev/develop/development-builds/create-a-build/) for iOS Simulator:

`npx eas-cli build --profile development-simulator --platform ios`

Run build on iOS Simulator

`npx expo run:ios`

Create a build for a device:

`npx eas-cli build --profile development --platform ios`

### Build for App Store with Expo's [EAS Build](https://docs.expo.dev/build/introduction/)

`npx eas-cli build --platform ios`

## Submit to App Store

Use Expo's [EAS Submit](https://docs.expo.dev/submit/ios/) with the command below to send a build to App Store Connect, where the app can be distributed to users with TestFlight or to the App Store.

`npx eas-cli submit -p ios`
