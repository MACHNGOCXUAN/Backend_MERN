/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModels'
import ApiError from '~/utils/ApiError'
import { columnModel } from '~/models/columnModels'
import { cardModel } from '~/models/cardModels'

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

const update = async ( id, reqbody ) => {
  try {
    const updateData = {
      ...reqbody,
      updatedAt: Date.now()
    }

    const updateBoard = await boardModel.update(id, updateData)

    return updateBoard
  } catch (error) {
    throw error
  }
}

const updateCardOtherColumn = async (reqBody) => {
  try {
    // b1 : cap nhat cardOrderIds cua card keo
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })

    // b2 : cap nhat cardOrderIds cua card tha
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })

    // b3 : Cap nha lai truong columnId moi cua cai card da keo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })
    return { updateResult: 'Seccessfully card other column' }
  } catch (error) {
    throw error
  }

}

export const boardServices = {
  createNew,
  getDetails,
  update,
  updateCardOtherColumn
}