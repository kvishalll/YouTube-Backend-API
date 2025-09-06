import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controllers/comment.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/:videoId").get(getVideoComments).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

export default router

// get all comment: GET http://localhost:8000/api/v1/comments/<videoId>?page=1&limit=10
// add a comment: POST http://localhost:8000/api/v1/comments/<videoId>
// update comment: PATCH http://localhost:8000/api/v1/comments/c/<commentId>
// delete comment: DELETE http://localhost:8000/api/v1/comments/c/<commentId>
