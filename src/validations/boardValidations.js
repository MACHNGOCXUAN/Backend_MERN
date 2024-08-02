import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Title là trường bắt buộc.',
      'string.empty': 'Title không được rỗng.',
      'string.min': 'Title tối thiếu phải 3 kí tự.',
      'string.max': 'Title tối đa là 256 kí tự.',
      'string.trim': 'Title không được có khoảng trắng ở đầu và cuối cuỗi'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict().messages({
      'any.required': 'Description là trường bắt buộc.',
      'string.empty': 'Description không được rỗng.',
      'string.min': 'Description tối thiếu phải 3 kí tự.',
      'string.max': 'Description tối đa là 256 kí tự.',
      'string.trim': 'Description không được có khoảng trắng ở đầu và cuối cuỗi'
    }),
    type: Joi.string().valid('public', 'private').required().messages({
      'any.required': 'Type là trường bắt buộc.',
      'string.empty': 'Type không được rỗng.',
      'string.trim': 'Type không được có khoảng trắng ở đầu và cuối cuỗi',
      'string.valid': 'Type chỉ được public or private'
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

const getDetails = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string().trim().strict().required()
  })

  try {
    await correctCondition.validateAsync({ id: req.params.id }, { abortEarly: false })
    next()
  } catch (error) {
    const customError = new ApiError(422, error.message)
    next(customError)
  }
}

export const boardValidations = {
  createNew, getDetails
}