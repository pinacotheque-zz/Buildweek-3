import express from "express"

import Controllers from "../controllers/experiences.js"
import { expsImgParser } from "../utils/cloudinary.js"

const router = express.Router()

router.route("/:userId").get(Controllers.getAllExp).post(Controllers.newExp)
router
  .route("/:userId/:expId")
  .get(Controllers.getOneExp)
  .put(Controllers.changeOneExp)
  .delete(Controllers.eraseOneExp)
router
  .route("/:userId/:expId/picture")
  .post(expsImgParser.single("picture"), Controllers.addExPic)
router.route("/:userId/csv").get()

export default router
