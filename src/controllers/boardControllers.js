
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)

    res.status(201).json({ message: 'Post APIs' })
  } catch (error) {
    next(error)
  }
}

export const boardControllers = {
  createNew
}
