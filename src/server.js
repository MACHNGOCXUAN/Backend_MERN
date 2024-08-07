/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'
import { APIs_v1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'


const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_v1)

  app.use(errorHandlingMiddleware)

  const hostname = env.APP_HOST
  const port = env.APP_PORT


  app.listen(port, hostname, () => {
    console.log(`3.Backend server is runing successfully http://${ hostname }:${ port }/`)
  })

  // Dong ket noi mongodb khi can thiet
  exitHook(() => {
    console.log('4.Disconnecting from MongoDB Cloud Atlas...')
    CLOSE_DB()
    console.log('5.Disconnected from MongoDB Cloud Atlas!')
  })
}


// Kết nối database
console.log('1.Connecting to MongoDB Cloud Atlas...')
CONNECT_DB()
  .then(() => console.log('2.Connected to MongoDB Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    console.log('2.Connection failed')
    process.exit(0)
  })
