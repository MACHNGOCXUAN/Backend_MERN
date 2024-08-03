import { columnServices } from '~/services/columnServices'

const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnServices.createNew(req.body)

    res.status(201).json(createColumn)
  } catch (error) {
    next(error)
  }
}

export const columnControllers = {
  createNew
}
