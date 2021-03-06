import Profile from "../models/profile.js"
import createError from "http-errors"
import { getPdfCV } from "../utils/pdf.js"
import { pipeline } from "stream"

const getAllUsers = async (req, res, next) => {
  try {
    const users = await Profile.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
}

const getSingleUser = async (req, res, next) => {
  try {
    const user = await Profile.findById(req.params.userId).populate("posts")
    res.send(user)
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const newUser = new Profile({ ...req.body })
    const { _id } = await newUser.save(newUser)
    res.send(_id)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await Profile.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    })
    if (updatedUser) {
      res.send(updatedUser)
    } else {
      next(createError(404, `User with _id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
}

const uploadProfilePicture = async (req, res, next) => {
  try {
    if (req.body.image) {
      const updatedUser = await Profile.findByIdAndUpdate(
        req.params.userId,
        { image: req.body.image },
        {
          new: true,
          runValidators: true,
        }
      )
      res.send(updatedUser)
    } else {
      const updatedUser = await Profile.findByIdAndUpdate(
        req.params.userId,
        { image: req.file.path },
        {
          new: true,
          runValidators: true,
        }
      )
      res.send(updatedUser)
    }
  } catch (error) {
    next(error)
  }
}

const getCvPdf = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.userId).populate("experiences")
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${profile.name}-${profile.surname}.pdf`
    )
    const pdfStream = await getPdfCV(profile)
    pipeline(pdfStream, res, (err) => {
      if (err) next(err)
    })
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  getAll: getAllUsers,
  getSingle: getSingleUser,
  newUser: createUser,
  updateUser: updateUser,
  uploadPicture: uploadProfilePicture,
  getCv: getCvPdf,
}

export default Controllers
