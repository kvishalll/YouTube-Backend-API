import { Router } from "express";
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// Subscribe / unsubscribe to a channel
router.post("/c/:channelId", toggleSubscription);

// Get subscribers of a channel
router.get("/c/:channelId", getUserChannelSubscribers);

// Get channels a user has subscribed to
router.get("/u/:subscriberId", getSubscribedChannels);

export default router;


// to get subscriber: http://localhost:8000/api/v1/subscriptions/c/68b5774444a20c8488f390df  it is user id: 68b5774444a20c8488f390df
