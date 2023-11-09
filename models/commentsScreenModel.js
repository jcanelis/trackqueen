// Services
import YouTubeComments from "../services/YouTube/getComments"
import YouTubeSearch from "../services/YouTube/getSearch"

const CommentsScreenModel = async ({ track, artist }) => {
  try {
    // Search YouTube videos. Save first result.
    const youTube = await YouTubeSearch(1, `${track} ${artist} official`, "")
    const video = youTube.items[0]

    // Store the video URL, cover image, and ID
    const url = `https://www.youtube.com/watch?v=${video.id.videoId}`
    const coverArt = video.snippet.thumbnails.high.url
    const videoId = video.id.videoId

    // Fetch relevant comments
    const commentsRelevantData = await YouTubeComments(videoId, "", "relevance")

    // Fetch recent comments
    const commentsRecentData = await YouTubeComments(videoId, "", "time")

    // Remove junk comments
    const commentsRelevant = commentsRelevantData.comments.filter(
      (comment) =>
        comment.snippet.topLevelComment.snippet.textOriginal.length < 700
    )

    // Remove junk comments
    const commentsRecent = commentsRecentData.comments.filter(
      (comment) =>
        comment.snippet.topLevelComment.snippet.textOriginal.length < 700
    )

    // Remove comments like "still listening in 2023"
    // if (
    //   content.length < 600 &&
    //   !content.includes("2023") &&
    //   !content.includes("2022") &&
    //   !content.includes("2021") &&
    //   !content.includes("2020") &&
    //   !content.includes("2019") &&
    //   !content.includes("2018") &&
    //   !content.includes("2017") &&
    //   !content.includes("2016")
    // ) {

    return {
      commentsRelevantData,
      commentsRelevant,
      commentsRecentData,
      commentsRecent,
      coverArt,
      url,
      videoId,
    }
  } catch (error) {
    console.error("Error retrieving data in CommentsScreenModel : \n", error)

    return false
  }
}

export default CommentsScreenModel
