import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    experiences: [{
      role: String,
      company: String,
      startDate: Date,
      endDate: Date, 
      description: String,
      area: String,
      username: String,
      image: String, }]
  },
  {
    timestamps: true,
  }
)

export default model("Profile", ProfileSchema)