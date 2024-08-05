import express from 'express'
import { boardValidations } from '~/validations/boardValidations'
import { boardControllers } from '~/controllers/boardControllers'


const router = express.Router()

router.route('/')
  .get((req, res) => {
    res.status(200).json({ message: 'Get APIs' })
  })
  .post(boardValidations.createNew, boardControllers.createNew)

router.route('/:id')
  .get(boardValidations.getDetails, boardControllers.getDetails)
  .put(boardValidations.update, boardControllers.update)

router.route('/support/movingCard')
  .put(boardValidations.updateCardOtherColumn, boardControllers.updateCardOtherColumn)

export const boardRoutes = router
