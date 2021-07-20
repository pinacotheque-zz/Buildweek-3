import mongoose from "mongoose"
const { Schema, model, ObjectId } = mongoose

const PostSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: { type: ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
)

export default model("Post", PostSchema)
