import express from 'express'
import { boardRoutes } from './boardRoutes'


const router = express.Router()

router.get('/status', (req, res) => {
  res.status(200).json({ message: 'APIs v1 are ready to use' })
})

router.use('/boards', boardRoutes)

export const APIs_v1 = router