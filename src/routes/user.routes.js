import { Router } from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken,getCurentUser,updateAccountUser, updateUserAvatar,updateUserCoverImage,getUserChannelProfile,getWatchHistory} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
// Secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshtoken").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurentUser)
router.route("/update-account").patch(verifyJWT, updateAccountUser)
router.route("/update-user-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/update-user-cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
export default router