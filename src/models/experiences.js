import mongoose from "mongoose"

const { Schema } = mongoose

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }, //could be null
    description: { type: String, required: true },
    area: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String, required: false }, //server generated on upload, set a default here
  },
  {
    timestamps: true,
  }
)

ExperienceSchema.pre("save", function (next) {
  if (!this.image) {
    this.image = `https://eu.ui-avatars.com/api/?name=${this.company}`
  }
  next()
})

export default ExperienceSchema
