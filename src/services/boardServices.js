/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModels'
import ApiError from '~/utils/ApiError'

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

const getDetails = async ( id ) => {
  try {
    const boardById = await boardModel.getDetails(id)
    if ( !boardById ) {
      throw new ApiError(404, 'Board not found!')
    }
    const resBoard = { ...boardById }
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    delete resBoard.cards
    return resBoard
  } catch (error) {
    throw error
  }
}

export const boardServices = {
  createNew,
  getDetails
}