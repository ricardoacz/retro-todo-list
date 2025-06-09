import {Client, Account} from 'appwrite'

const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const devKey = import.meta.env.VITE_APPWRITE_DEV_KEY

const client = new Client()
    .setProject(projectID)
    .setDevKey(devKey);

const account = new Account(client)

export {client, account }
export { ID } from 'appwrite'