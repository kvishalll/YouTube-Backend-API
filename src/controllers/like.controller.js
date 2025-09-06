import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id")
    }

    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Video unliked successfully"))
    }

    await Like.create({
        video: videoId,
        likedBy: req.user._id
    })


    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Video liked successfully"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id")
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Comment unliked successfully"))
    }

    await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Comment liked successfully"))
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id")
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id)

        // console.log("Tweet detail: ", existingLike._id, "Unliked tweet: ", {}); 

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Tweet unliked successfully"))
    }



    await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })

    // console.log("All parameters details: ", req.params, "tweet id: ", tweetId);

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "Tweet liked successfully"))
})

const getLikedVideos = asyncHandler(async (req, res) => {
    const likes = await Like.find({
        likedBy: req.user._id,
        video: { $exists: true, $ne: null }
    }).populate("video")

    // console.log(typeof (likes)); // object 


    return res
        .status(200)
        .json(new ApiResponse(200, likes, "Liked video fetched successfully"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}