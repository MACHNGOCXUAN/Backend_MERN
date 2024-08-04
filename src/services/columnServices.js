/* eslint-disable no-useless-catch */

import { columnModel } from '~/models/columnModels'
import { boardModel } from '~/models/boardModels'

const createNew = async ( reqBody ) => {
  try {
    const newcolumn = {
      ...reqBody
    }

    const createdcolumn = await columnModel.createNew(newcolumn)
    // console.log(createdcolumn.insertedId)
    const columnById = await columnModel.findOneById(createdcolumn.insertedId)
    if (columnById) {
      // console.log(columnById)
      columnById.cards=[]
      await boardModel.pushColumnOrderIds(columnById)
    }
    return columnById
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

    const updateColumn = await columnModel.update(id, updateData)

    return updateColumn
  } catch (error) {
    throw error
  }
}

export const columnServices = {
  createNew,
  update
}