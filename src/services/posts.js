import express from "express"
import Controllers from "../controllers/posts.js"

const router = express.Router()



router.route("/").get(Controllers.getAll)
router.route("/:userId").post(Controllers)
router.route("/:postId").get(Controllers.getSingle)
                        .put(Controllers.updatePost)
                        .delete(Controllers.deletePost)
                        .post(Controllers.newPost)

export default router
