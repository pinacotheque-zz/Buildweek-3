const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL]

const options = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by cors!"))
    }
  },
}
