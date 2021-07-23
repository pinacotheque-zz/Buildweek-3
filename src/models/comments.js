import mongoose from "mongoose"
const { Schema, model, ObjectId } = mongoose




const CommentSchema = new Schema(
  {
    user: { type: ObjectId, ref: "Profile" },
    comment: {type: String, required: true },
    postId: { type: ObjectId, ref: "Post" },    
  },
  {
    timestamps: true,
  }
)

export default model("Comment", CommentSchema)
