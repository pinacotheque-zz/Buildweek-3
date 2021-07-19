import express from "express"
import Controllers from "../controllers/profiles.js"
import { profileImgParser } from "../utils/cloudinary.js"

const router = express.Router()

router.route("/").get().post()
router.route("/:userId").get().put()
router
  .route("/:userId/picture")
  .post(profileImgParser.single("picture"), Controllers.uploadPicture)
router.route("/:userId/cv").get()

export default router
