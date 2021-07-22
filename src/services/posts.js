import express from "express"
import Controllers from "../controllers/posts.js"
import { postsImgParser } from "../utils/cloudinary.js"

const router = express.Router()

router.route("/").get(Controllers.getAll)
router.route("/:userId/new").post(Controllers.createPost)
router
  .route("/:postId")
  .post(postsImgParser.single("post"), Controllers.updateImage)
  .get(Controllers.getSingle)
  .put(Controllers.updatePost)
  .delete(Controllers.deletePost)
router.route("/:postId/:userId").post(Controllers.like).delete(Controllers.unlike)

export default router
