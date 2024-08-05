import { boardServices } from '~/services/boardServices'

const createNew = async (req, res, next) => {
  try {
    // console.log('req.body', req.body)
    // console.log('req.query', req.query)
    // console.log('req.params', req.params)

    const createBoard = await boardServices.createNew(req.body)

    res.status(201).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const boardId = req.params.id
    // console.log(boardId)

    const board = await boardServices.getDetails(boardId)

    res.status(200).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    // console.log('req.body', req.body)
    const boardId = req.params.id
    // console.log(boardId)

    const updateBoard = await boardServices.update(boardId, req.body)

    res.status(200).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const updateCardOtherColumn = async (req, res, next) => {
  try {

    const result = await boardServices.updateCardOtherColumn(req.body)

    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export const boardControllers = {
  createNew,
  getDetails,
  update,
  updateCardOtherColumn
}
