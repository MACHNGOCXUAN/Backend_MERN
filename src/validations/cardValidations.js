import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Title là trường bắt buộc.',
      'string.empty': 'Title không được rỗng.',
      'string.min': 'Title tối thiếu phải 3 kí tự.',
      'string.max': 'Title tối đa là 256 kí tự.',
      'string.trim': 'Title không được có khoảng trắng ở đầu và cuối cuỗi'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(422, errorMessage)
    next(customError)

    // res.status(422).json({
    //   errors: new Error(error).message
    // })
  }
}

export const cardValidations = {
  createNew
}