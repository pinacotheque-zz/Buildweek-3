import Post from "../models/post.js"
import createError from "http-errors"



// GET ALL
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
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
      const newPost = new Post({ ...req.body })
      const { _id } = await newPost.save(newPost)
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
      if (deletedPost) {
        res.status(204).send(`Blog with id: ${req.params.postId} is deleted successfully! `)
      } else {
        next(createError(404, `Blog id: ${req.params.postId} not found!`))
      }
    } catch (error) {
        next(createError(500, `An error occurred while deleting post ${req.params.postId}`))
      }
  }


const Controllers = {
    getAll: getAllPosts,
    getSingle: getSinglePost,
    newPost,
    updatePost,
    deletePost
  }
  
  export default Controllers