import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { cardModel } from './cardModels'
import { columnModel } from './columnModels'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid('public', 'private').required(),

  columnOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validatorModels = async ( data ) => {
  return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async ( data ) => {
  try {
    const validatorData = await validatorModels(data)
    // console.log(validatorData)
    const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne( validatorData )

    return createdBoard
  } catch (error) { throw new Error(error) }
}

const findOneById = async ( id ) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) { throw new Error(error) }
}

const getDetails = async ( id ) => {
  try {
    // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
      { $match: {
        _id: new ObjectId(id),
        _destroy: false
      } },
      {
        $lookup: {
          from: columnModel.COLUMN_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: cardModel.CARD_COLLECTION_NAME,
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ]).toArray()
    return result[0] || {}
  } catch (error) { throw new Error(error) }
}

const pushColumnOrderIds = async (column) => {
  try {
    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(column.boardId) },
      { $push: { columnOrderIds: new ObjectId(column._id) } },
      { returnDocument: 'after' }
    )

    // console.log(result.value)
    return result
  } catch (error) { throw new Error(error) }
}

const update = async ( id, updateData ) => {
  try {
    Object.keys(updateData).forEach(fileName => {
      if (INVALID_UPDATE_FIELDS.includes(fileName)) {
        delete updateData[fileName]
      }
    })

    // console.log(updateData)

    if (updateData.columnOrderIds) {
      updateData.columnOrderIds = updateData.columnOrderIds.map(_id => (new ObjectId(_id)))
    }

    const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    // console.log(result.value)
    return result
  } catch (error) { throw new Error(error) }
}

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  pushColumnOrderIds,
  update
}
