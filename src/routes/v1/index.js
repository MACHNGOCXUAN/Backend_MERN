import express from 'express'
import { boardRoutes } from './boardRoutes'
import { columnRoutes } from './columnRoutes'
import { cardRoutes } from './cardRoutes'


const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs v1 are ready to use' })
})

router.use('/boards', boardRoutes)

router.use('/columns', columnRoutes)

router.use('/cards', cardRoutes)

export const APIs_v1 = router