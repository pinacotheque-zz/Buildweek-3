import mongoose from "mongoose"
import ExperienceSchema from "./experiences.js"

const { Schema, model, ObjectId } = mongoose

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
      required: false,
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
      required: false,
    },
    experiences: [ExperienceSchema],
    posts: [{ type: ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
)

ProfileSchema.pre("save", function (next) {
  if (!this.image) {
    this.image = `https://eu.ui-avatars.com/api/?name=${this.name}+${this.surname}`
  }
  next()
})

export default model("Profile", ProfileSchema)
