import { MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI = 'mongodb+srv://machngocxuan2004:gWcq8rIx8Bje5vts@trello-web.pcrr73y.mongodb.net/?retryWrites=true&w=majority&appName=trello-web'

let trelloDatabaseInstance = 'null'

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const database_name = 'trello-web-apis'

// ket noi den db
export const CONNECT_DB = async () => {
  await client.connect()

  trelloDatabaseInstance = client.db(database_name)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect database first!')
  return trelloDatabaseInstance
}

