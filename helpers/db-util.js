import {MongoClient} from 'mongodb'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI
  console.log(uri)
  const options = {tls: true, ssl: true}


  try {
    const client = await new MongoClient(uri, options).connect()

    return client

  } catch (e) {

    console.log(e + 'pasok')

  }


}

export async function insertDocument(client, collection, document) {
  const db = client.db()

  const result = await db.collection(collection).insertOne(document)

  return result
}

export async function findOne(client, collection, document) {
  const db = client.db()
  const result = await db.collection(collection).findOne(document)

  return result
}

export async function find(client, collection) {
  const db = client.db()
  const result = await db.collection(collection).find({}).toArray()

  return result
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
}
