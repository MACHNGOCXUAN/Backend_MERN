import express from 'express'
import { columnValidations } from '~/validations/columnValidations'
import { columnControllers } from '~/controllers/columnControllers'

const router = express.Router()

router.route('/')
  .post(columnValidations.createNew, columnControllers.createNew)

export const columnRoutes = router