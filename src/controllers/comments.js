import Post from "../models/post.js"
import Profile from "../models/profile.js"
import createError from "http-errors"
import q2m from "query-to-mongo"
import CommentModel from "../models/comments.js"

// GET ALL
// const getComm = async (req, res, next) => {
//   try {
//     const query = q2m(req.query)
//     console.log(query)
//     const posts = await Post.find(query.criteria, {}, query.options).populate("user")
//     res.send(posts)
//   } catch (error) {
//     next(createError(500, `An error occurred while getting the posts`))
//   }
// }

// // GET SINGLE
// const getSinglePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.postId)
//     res.send(post)
//   } catch (error) {
//     next(createError(500, `An error occurred while getting the post`))
//   }
// }

// POST POST
const newComm = async (req, res, next) => {
  try {
    const newComm = new CommentModel({ ...req.body, postId: req.params.postId  })
    const { _id } = await newComm.save(newComm)
    await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: _id } })
    res.send(_id)
  } catch (error) {
      console.log(error);
    next(createError(500, `An error occurred while creating a post`))
  }
}

// // UPDATE POST
const updateComm = async (req, res, next) => {
  try {
// const post = await Post.findOneAndUpdate({
//     _id: req.params.postId,
//     'comments._id' : req.params.commentId,
// },{})

    const updatedComm = await CommentModel.findByIdAndUpdate(req.params.commentId, req.body, {
      new: true,
      runValidators: true,
    })
    if (updatedComm) {
      res.send(updatedComm)
    } else {
      next(createError(404, `Comment id: ${req.params.commentId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating post ${req.params.commentId}`))
  }
}

// DELETE POST
const delComm = async (req, res, next) => {
  try {
    const deletedComm = await Post.findByIdAndDelete(req.params.commentId)
    // await Profile.findByIdAndUpdate(
    //   deletedComm.user,
    //   {
    //     $pull: { posts: req.params.postId },
    //   },
    //   { new: true, runValidators: true }
    // )
    if (deletedComm) {
      res.status(200).send(`COmm with id: ${req.params.commentId} is deleted successfully! `)
    } else {
      next(createError(404, `Blog id: ${req.params.commentId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting post ${req.params.postId}`))
  }
}


const Controllers = {
 
    newComm,
    updateComm,
    delComm
 
}

export default Controllers
