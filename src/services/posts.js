import express from "express"
import Controllers from "../controllers/posts.js"

const router = express.Router()

router.route("/").get().post()
router.route("/:postId").get().put().delete().post()

export default router
