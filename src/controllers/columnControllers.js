import { columnServices } from '~/services/columnServices'

const createNew = async (req, res, next) => {
  try {
    const createColumn = await columnServices.createNew(req.body)

    res.status(201).json(createColumn)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    // console.log('req.body', req.body)
    const columnId = req.params.id
    // console.log(boardId)

    const updateColumn = await columnServices.update(columnId, req.body)

    res.status(200).json(updateColumn)
  } catch (error) {
    next(error)
  }
}

export const columnControllers = {
  createNew,
  update
}
