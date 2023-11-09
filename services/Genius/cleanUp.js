const GeniusCleanUp = (data) => {
  let trackDescription

  if (data.meta.status !== 404) {
    trackDescription =
      data.response.song.description.plain === "?"
        ? "No track description found from Genius.com."
        : data.response.song.description.plain
  }

  if (data.meta.status === 404) {
    trackDescription = "No track description found from Genius.com."
  }

  return trackDescription
}

export default GeniusCleanUp
