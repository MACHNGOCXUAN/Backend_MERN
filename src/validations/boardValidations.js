import Joi from 'joi'

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
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    res.status(422).json({
      errors: new Error(error).message
    })
  }

}

export const boardValidations = {
  createNew
}