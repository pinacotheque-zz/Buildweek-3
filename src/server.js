import express from "express"

import listEndpoints from "express-list-endpoints"
import cors from "cors"
import createError from "http-errors"
import morgan from "morgan"
import mongoose from "mongoose"
import apiRouter from "./services/index.js"

const port = process.env.PORT || 3001
const server = express()

// Middlewares

server.use(cors())
server.use(express.json())
server.use(morgan("dev"))

server.use("/api", apiRouter)

console.table(listEndpoints(server))

server.use((req, res) => {
  if (!req.route) {
    const error = createError(404, "This route is not found!")
    res.status(error.status).send(error)
  }
})

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(port, () => {
      console.log("Server running on port ", port)
    })
  )
  .catch((err) => console.log(err))
