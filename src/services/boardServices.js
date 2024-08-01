/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModels'

const createNew = async ( reqBody ) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard.insertedId)
    const boardById = await boardModel.findOneById(createdBoard.insertedId)
    return boardById
  } catch (error) {
    throw error
  }
}

export const boardServices = {
  createNew
}