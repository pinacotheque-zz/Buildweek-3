import express from "express"
import Controllers from "../controllers/posts.js"

const router = express.Router()



router.route("/").get(Controllers.getAll).post(Controllers.createPost)
router.route("/:postId").get(Controllers.getSingle)
                        .put(Controllers.updatePost)
                        .delete(Controllers.deletePost)
                        

export default router
