/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'


const START_SERVER = () => {
  const app = express()

  const hostname = 'localhost'
  const port = 8017

  app.get('/', async (req, res) => {
    console.log( await GET_DB().listCollections().toArray())
    res.end('<h1>Mach ngoc xuan</h1><hr>')
  })

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
