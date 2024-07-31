import express from 'express'


const router = express.Router()

router.route('/board')
  .get((req, res) => {
    res.status(200).json({ message: 'Get APIs' })
  })
  .post((req, res) => {
    res.status(201).json({ message: 'Post APIs' })
  })

export const boardRoutes = router
