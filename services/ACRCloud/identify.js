// Crypto
import hmacSHA1 from "crypto-js/hmac-sha1"
import Base64 from "crypto-js/enc-base64"

// Expo
import { File, Paths } from "expo-file-system"

// Custom
import Keys from "../../constants/Keys"

function buildStringToSign(
  method,
  uri,
  accessKey,
  dataType,
  signatureVersion,
  timestamp
) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join(
    "\n"
  )
}

function signString(stringToSign, accessSecret) {
  return Base64.stringify(hmacSHA1(stringToSign, accessSecret))
}

export default async function Identify(audiofile, signal) {
  console.log("audiofilesize", audiofile.size)

  console.log("audiofile", audiofile)
  const newfile = new File(Paths.cache, audiofile.uri)
  console.log("newfile", newfile)

  try {
    const options = {
      host: "identify-us-west-2.acrcloud.com",
      endpoint: "/v1/identify",
      signature_version: "1",
      data_type: "audio",
      secure: true,
      access_key: `${Keys.Acr}`,
      access_secret: `${Keys.AcrSecret}`,
    }

    const current_date = new Date()
    const timestamp = current_date.getTime() / 1000
    const stringToSign = buildStringToSign(
      "POST",
      options.endpoint,
      options.access_key,
      options.data_type,
      options.signature_version,
      timestamp
    )

    const signature = signString(stringToSign, options.access_secret)
    const formData = {
      sample: { uri: newfile.uri, name: "sample.wav", type: "audio/wav" },
      access_key: options.access_key,
      data_type: options.data_type,
      signature_version: options.signature_version,
      signature: signature,
      sample_bytes: newfile.size,
      timestamp: timestamp,
    }
    var form = new FormData()
    for (let key in formData) {
      form.append(key, formData[key])
    }

    let postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: form,
      signal,
    }

    console.log("Fetching from API...")

    let response = await fetch(
      "https://" + options.host + options.endpoint,
      postOptions
    )

    console.log("RESPONSE", response)

    let responseJSON = await response.json()
    console.log("RESPONSEJSON RESPONSEJSON ", responseJSON)

    return responseJSON
  } catch (error) {
    return error
  }
}
