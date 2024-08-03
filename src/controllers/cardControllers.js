import { cardServices } from '~/services/cardServices'

const createNew = async (req, res, next) => {
  try {
    const createCard = await cardServices.createNew(req.body)

    res.status(201).json(createCard)
  } catch (error) {
    next(error)
  }
}

export const cardControllers = {
  createNew
}
