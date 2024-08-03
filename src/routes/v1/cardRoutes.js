import express from 'express'
import { cardValidations } from '~/validations/cardValidations'
import { cardControllers } from '~/controllers/cardControllers'

const router = express.Router()

router.route('/')
  .post(cardValidations.createNew, cardControllers.createNew)

export const cardRoutes = router