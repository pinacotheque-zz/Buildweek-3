import Profile from "../models/profile.js"
import createError from "http-errors"

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
    const user = await Profile.findById(req.params.userId)
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
    let url
    if (req.file) {
      url = req.file.path
    }
    res.send(url)
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
}

export default Controllers