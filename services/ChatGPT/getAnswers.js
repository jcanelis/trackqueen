/*
  Chat GPT
  Ask for information about the track
  https://platform.openai.com/docs/api-reference/chat
*/

import Keys from "../../constants/Keys"

const ChatGPT = async (query, signal) => {
  const body = {
    model: "gpt-5.4",
    reasoning: { effort: "low" },
    instructions:
      "You're an app that tells people about the music they're currently listening to. Do not use markdown.",
    input: query,
  }

  try {
    let response = await fetch("https://api.openai.com/v1/responses", {
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
