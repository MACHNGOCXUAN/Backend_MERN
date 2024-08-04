import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'boardId']

const validatorModels = async ( data ) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async ( data ) => {
  try {
    const validatorData = await validatorModels(data)
    // console.log(validatorData)
    const createdBoard = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne({
      ...validatorData,
      boardId: new ObjectId(validatorData.boardId)
    })

    return createdBoard
  } catch (error) { throw new Error(error) }
}

const findOneById = async ( id ) => {
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })

    return result
  } catch (error) { throw new Error(error) }
}

const pushCardOderIds = async (card) => {
  try {
    const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(card.columnId) },
      { $push: { cardOrderIds: new ObjectId(card._id) } },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, updateData) => {
  try {
    Object.keys(updateData).forEach(fileName => {
      if (INVALID_UPDATE_FIELDS.includes(fileName)) {
        delete updateData[fileName]
      }
    })

    // console.log('ID:', id)
    // console.log('Update Data:', updateData)

    const db = GET_DB()
    const result = await db.collection(COLUMN_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    // console.log('Result:', result)

    return result
  } catch (error) { throw new Error(error) }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOderIds,
  update
}