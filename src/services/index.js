import express from "express"
import expsRouter from "./experiences.js"
import postsRouter from "./posts.js"
import profilesRouter from "./profiles.js"

const router = express.Router()

router.use("/profiles", profilesRouter)
router.use("/experiences", expsRouter)
router.use("/posts", postsRouter)

export default router
