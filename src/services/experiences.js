import express from "express";

import Controllers from "../controllers/experiences.js";
import { expsImgParser } from "../utils/cloudinary.js";

const router = express.Router();

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences
// Get user experiences
// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences
// Create an experience.
// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
// - PUT https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
// - DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
// Change the experience picture
// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV

router.route("/:userId")
.get(Controllers.getAllExp )
.post(Controllers.newExp );
router.route("/:userId/:expId")
.get( Controllers.getOneExp)
.put( Controllers.changeOneExp)
.delete(Controllers.eraseOneExp);
router.route("/:userId/:expId/picture")
.post(expsImgParser.single("picture"), Controllers.addExPic );
router.route("/:userId/csv").get( );



export default router;
