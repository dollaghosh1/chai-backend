import { Router } from 'express';
import { publishAVideo, getVideoById, updateVideo, updateVideoFile, getAllVideos, deleteVideo, togglePublishStatus } from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/publish-video").post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    )
router.route("/video-details/:videoId").get(getVideoById)
router.route("/update-video/:videoId").patch(updateVideo)
router.route("/update-video-file/:videoId").patch(upload.single("videoFile"),updateVideoFile)
router.route("/all-video").get(getAllVideos)
router.route("/delete-video/:videoId").delete(deleteVideo)
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
export default router