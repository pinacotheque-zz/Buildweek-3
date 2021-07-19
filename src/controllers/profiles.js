const uploadProfilePicture = async (req, res, next) => {
  try {
    let url
    if (req.file) {
      url = req.file.path
    }
    res.send(url)
  } catch (error) {
    next(error)
  }
}

const Controllers = {
  uploadPicture: uploadProfilePicture,
}

export default Controllers
