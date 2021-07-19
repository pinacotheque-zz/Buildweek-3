import mongoose from 'mongoose'
const { Schema, model } = mongoose


const postSchema = new Schema (
    {
       text: {
           type: String,
           required: true
       },
       username: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true,
        },
        user: [{ type: ObjectId, ref: "Profile" }],
    },
    {
      timestamps: true,
    }
)


export default model("Post", PostSchema)