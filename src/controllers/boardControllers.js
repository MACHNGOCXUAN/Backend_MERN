
const createNew = async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    console.log('req.query', req.query)
    console.log('req.params', req.params)

    res.status(201).json({ message: 'Post APIs' })
  } catch (error) {
    res.status(500).json({
      errors: error.message
    })
  }
}

export const boardControllers = {
  createNew
}
