import express from "express"
import Controllers from "../controllers/profiles.js"
import { profileImgParser } from "../utils/cloudinary.js"

const router = express.Router()

router.route("/").get(Controllers.getAll).post(Controllers.newUser)
router.route("/:userId").get(Controllers.getSingle).put(Controllers.updateUser)
router
  .route("/:userId/picture")
  .post(profileImgParser.single("picture"), Controllers.uploadPicture)
router.route("/:userId/cv").get(Controllers.getCv)

export default router
