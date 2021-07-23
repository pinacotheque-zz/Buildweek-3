import express from "express"
import Controllers from "../controllers/comments.js"


const router = express.Router()

router.route("/:postId/comment")
.post(Controllers.newComm)
router.route("/:postId/comment/commentId")
  .put(Controllers.updateComm)
  .delete(Controllers.delComm)


export default router
