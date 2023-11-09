// Crypto
import hmacSHA1 from "crypto-js/hmac-sha1"
import Base64 from "crypto-js/enc-base64"

// Expo
import * as FileSystem from "expo-file-system"

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

export default async function Identify(uri, signal) {
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
    let fileinfo = await FileSystem.getInfoAsync(uri, { size: true })
    const signature = signString(stringToSign, options.access_secret)
    const formData = {
      sample: { uri: uri, name: "sample.wav", type: "audio/wav" },
      access_key: options.access_key,
      data_type: options.data_type,
      signature_version: options.signature_version,
      signature: signature,
      sample_bytes: fileinfo.size,
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

    let response = await fetch(
      "http://" + options.host + options.endpoint,
      postOptions
    )
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    return error
  }
}
