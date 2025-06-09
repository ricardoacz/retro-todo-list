import { Client, Databases, Account } from 'node-appwrite'
import dotenv from 'dotenv'

dotenv.config()

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // for server-side SDK

const databases = new Databases(client)
const account = new Account(client)

export { client, databases, account }