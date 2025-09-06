import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.user._id;

    console.log(req.user._id);


    const totalVideos = await Video.countDocuments({ owner: channelId });

    // Total views
    const totalViewsAgg = await Video.aggregate([
        { $match: { owner: channelId } },
        { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);
    const totalViews = totalViewsAgg[0]?.totalViews || 0;


    const totalSubscribers = await Subscription.countDocuments({ channel: channelId });


    // Total likes (on all channel videos)
    const channelVideoIds = await Video.find({ owner: channelId }).distinct("_id");
    const totalLikes = await Like.countDocuments({ video: { $in: channelVideoIds } });

    console.log("Total videos: ", totalVideos, "Total likes: ", totalLikes, "Total views: ", totalViews, "Total Subscriber: ", totalSubscribers);



    return res.status(200).json(
        new ApiResponse(200, {
            totalVideos,
            totalViews,
            totalSubscribers,
            totalLikes,
        }, "Channel stats fetched successfully")
    );
});



const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const videos = await Video.find({ owner: channelId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean();

    return res.status(200).json(
        new ApiResponse(200, videos, "Channel videos fetched successfully")
    );
});


export {
    getChannelStats,
    getChannelVideos
}