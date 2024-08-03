/* eslint-disable no-useless-catch */

import { cardModel } from '~/models/cardModels'
import { columnModel } from '~/models/columnModels'

const createNew = async ( reqBody ) => {
  try {
    const newcard = {
      ...reqBody
    }

    const createdcard = await cardModel.createNew(newcard)
    // console.log(createdcard.insertedId)
    const cardById = await cardModel.findOneById(createdcard.insertedId)

    if (cardById) {
      await columnModel.pushCardOderIds(cardById)
    }

    return cardById
  } catch (error) {
    throw error
  }
}

export const cardServices = {
  createNew
}