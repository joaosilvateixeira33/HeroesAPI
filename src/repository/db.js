import * as mongoDB from 'mongodb'
import { DATABASE_NAME } from './db-constants.js'

export let db

export const connectToDatabase = async () => {
  try {
    const client = new mongoDB.MongoClient('mongodb://localhost:27017', {})
    await client.connect()
    db = client.db(DATABASE_NAME)
    console.log(`Successfully connected to database: ${db.databaseName}`)
  } catch (e) {
    console.log('There was an error: [' + e + '] when connecting to database: ' + DATABASE_NAME)
  }
}


export const initializeDatabase = async () => {
  await connectToDatabase()
}