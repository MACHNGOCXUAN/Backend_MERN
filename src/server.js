/* eslint-disable no-console */
import express from 'express'
import { CONNECT_DB, GET_DB } from '~/config/mongodb'


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
}


// Kết nối database
console.log('1.Connecting to MongoDB cloud Atlas...')
CONNECT_DB()
  .then(() => console.log('2.Connected to MongoDB cloud Atlas!'))
  .then(() => START_SERVER())
  .catch(error => {
    console.error(error)
    console.log('2.Connection failed')
    process.exit(0)
  })
