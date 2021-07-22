import Profile from "../models/profile.js"

const postExperience = async (req, res, next) => {
  try {
    const updatedProf = await Profile.findByIdAndUpdate(
      req.params.userId,
      {
        $push: {
          experiences: {
            ...req.body,
            image: `https://eu.ui-avatars.com/api/?name=${req.body.company}`,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    )
    const newExperience = updatedProf.experiences.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
    res.send(newExperience[0]._id)
  } catch (error) {
    next(error)
  }
}

const getAllExp = async (req, res, next) => {
  try {
    const user = await Profile.findById(req.params.userId, { experiences: 1 })
    res.send(user)
  } catch (error) {
    next(error)
  }
}

const getOneExp = async (req, res, next) => {
  try {
    const exp = await Profile.findOne(
      { _id: req.params.userId },
      {
        experiences: { $elemMatch: { _id: req.params.expId } },
        _id: 0,
      }
    )
    res.send(exp)
  } catch (error) {
    next(error)
  }
}

const changeOneExp = async (req, res, next) => {
  try {
    const q = {}
    for (const [key, value] of Object.entries(req.body)) {
      q["experiences.$." + key] = value
    }

    const user = await Profile.findOneAndUpdate(
      { _id: req.params.userId, "experiences._id": req.params.expId },
      { $set: q },
      { new: true, runValidators: true }
    )
    res.send(user)
  } catch (error) {
    next(error)
  }
}

const eraseOneExp = async (req, res, next) => {
  try {
    const user = await Profile.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { experiences: { _id: req.params.expId } },
      },
      { new: true, runValidators: true }
    )
    res.send(user)
  } catch (error) {
    next(error)
  }
}

const addExPic = async (req, res, next) => {
  try {
    const exp = await Profile.findOneAndUpdate(
      { _id: req.params.userId, "experiences._id": req.params.expId },
      { $set: { "experiences.$.image": req.file.path } },
      { new: true, runValidators: true }
    )
    res.send(exp)
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  newExp: postExperience,
  getAllExp,
  getOneExp,
  changeOneExp,
  eraseOneExp,
  addExPic,
}

export default Controllers
