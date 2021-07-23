import Post from "../models/post.js"
import Profile from "../models/profile.js"
import createError from "http-errors"
import q2m from "query-to-mongo"

// GET ALL
const getAllPosts = async (req, res, next) => {
  try {
    const query = q2m(req.query)
    console.log(query)
    const posts = await Post.find(query.criteria, {}, query.options).populate("user")
    res.send(posts)
  } catch (error) {
    next(createError(500, `An error occurred while getting the posts`))
  }
}

// GET SINGLE
const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.send(post)
  } catch (error) {
    next(createError(500, `An error occurred while getting the post`))
  }
}

// POST POST
const createPost = async (req, res, next) => {
  try {
    const newPost = new Post({ ...req.body, user: req.params.userId })
    const { _id } = await newPost.save(newPost)
    await Profile.findByIdAndUpdate({ _id: req.params.userId }, { $push: { posts: _id } })
    res.send(_id)
  } catch (error) {
    next(createError(500, `An error occurred while creating a post`))
  }
}

// UPDATE POST
const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {
      new: true,
      runValidators: true,
    })
    if (updatedPost) {
      res.send(updatedPost)
    } else {
      next(createError(404, `Blog id: ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while updating post ${req.params.postId}`))
  }
}

// DELETE POST
const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId)
    await Profile.findByIdAndUpdate(
      deletedPost.user,
      {
        $pull: { posts: req.params.postId },
      },
      { new: true, runValidators: true }
    )
    if (deletedPost) {
      res.status(200).send(`Blog with id: ${req.params.postId} is deleted successfully! `)
    } else {
      next(createError(404, `Blog id: ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(createError(500, `An error occurred while deleting post ${req.params.postId}`))
  }
}


// LIKE POST
const likePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { likes: req.params.userId },
    })
    res.send(200)
  } catch (error) {
    next(error)
  }
}

// UNLIKE POST
const unlikePost = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { likes: req.params.userId },
    })
    res.send(200)
  } catch (error) {
    next(error)
  }
}

const updateImage = async (req, res, next) => {
  try {
    if (req.body.image) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { image: req.body.image },
        {
          new: true,
          runValidators: true,
        }
      )
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.postId,
        { image: req.file.path },
        {
          new: true,
          runValidators: true,
        }
      )
    }
    res.send(updatedPost)
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  getAll: getAllPosts,
  getSingle: getSinglePost,
  createPost,
  updatePost,
  deletePost,
  like: likePost,
  unlike: unlikePost,
  updateImage,
}

export default Controllers
