// Crypto
import hmacSHA1 from "crypto-js/hmac-sha1"
import Base64 from "crypto-js/enc-base64"

// Expo
import { File } from "expo-file-system"

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

    // The new expo-file-system File class implements the web Blob interface
    // natively, so it can be appended to FormData directly without any
    // ArrayBuffer or base64 conversion (both of which fail on Hermes).
    const file = new File(uri)
    const signature = signString(stringToSign, options.access_secret)

    var form = new FormData()
    form.append("sample", file, "sample.wav")
    form.append("access_key", options.access_key)
    form.append("data_type", options.data_type)
    form.append("signature_version", options.signature_version)
    form.append("signature", signature)
    form.append("sample_bytes", String(file.size))
    form.append("timestamp", String(timestamp))

    // Do NOT set Content-Type manually — fetch must set it automatically so
    // that the multipart boundary is included in the header value.
    let postOptions = {
      method: "POST",
      body: form,
      signal,
    }

    let response = await fetch(
      "https://" + options.host + options.endpoint,
      postOptions
    )

    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    throw error
  }
}
