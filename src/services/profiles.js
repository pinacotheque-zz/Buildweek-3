import express from "express"
import Controllers from "../controllers/profiles.js"

const router = express.Router()

router.route("/").get().post()
router.route("/:userId").get().put()
router.route("/:userId/picture").post()
router.route("/:userId/cv").get()

export default router
