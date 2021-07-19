import express from "express"

import Controllers from "../controllers/experiences.js"

const router = express.Router()

router.route("/:userId").get().post()
router.route("/:userId/:expId").get().put()
router.route("/:userId/:expId/picture").post()
router.route("/:userId/csv").get()

export default router
