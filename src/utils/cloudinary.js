import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

const postsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "buildweek3/posts",
  },
})

const expsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "buildweek3/experiences",
  },
})

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "buildweek3/profiles",
  },
})

export const postsImgParser = multer({ storage: postsStorage })
export const expsImgParser = multer({ storage: expsStorage })
export const profileImgParser = multer({ storage: profileStorage })
