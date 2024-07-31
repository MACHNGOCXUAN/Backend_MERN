import express from 'express'
import { boardValidations } from '~/validations/boardValidations'


const router = express.Router()

router.route('/board')
  .get((req, res) => {
    res.status(200).json({ message: 'Get APIs' })
  })
  .post(boardValidations.createNew)

export const boardRoutes = router
