import mongoose from "mongoose"

const { Schema } = mongoose

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String, required: false },
    area: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

export default ExperienceSchema
