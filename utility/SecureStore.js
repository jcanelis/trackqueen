import * as SecureStore from "expo-secure-store"

const saveSecureValue = async function (key, value) {
  await SecureStore.setItemAsync(key, value)
}

const getSecureValue = async function (key) {
  try {
    let result = await SecureStore.getItemAsync(key)

    return result
  } catch (error) {
    console.error(error)
  }
}

export { saveSecureValue, getSecureValue }
