import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'


const MONGODB_URI = env.MONGODB_URI
const DATABASE_NAME = env.DATABASE_NAME

let trelloDatabaseInstance = 'null'

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})


// ket noi den database
export const CONNECT_DB = async () => {
  await client.connect()

  trelloDatabaseInstance = client.db(DATABASE_NAME)
}

// Dong ket noi database
export const CLOSE_DB = async () => {
  await client.close()
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect database first!')
  return trelloDatabaseInstance
}

