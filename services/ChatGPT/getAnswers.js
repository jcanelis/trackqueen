/*
  Chat GPT
  Ask for information about the track
  https://platform.openai.com/docs/api-reference/chat
*/

import Keys from "../../constants/Keys"

const ChatGPT = async (query, signal) => {
  const body = {
    model: "gpt-4.1",
    messages: [{ role: "user", content: query }],
    temperature: 0.7,
    frequency_penalty: 1,
  }

  try {
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${Keys.GPT}`,
      },
      body: JSON.stringify(body),
      signal,
    })
    let responseJSON = await response.json()

    return responseJSON
  } catch (error) {
    console.error(error)

    return error
  }
}

export default ChatGPT
