/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'

const createNew = async ( reqBody ) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // console.log(newBoard)
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardServices = {
  createNew
}