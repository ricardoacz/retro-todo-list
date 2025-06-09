import { client, databases, account } from '../config/appwrite.js'
import { ID, Query } from 'node-appwrite'

export const getUser = async (req, res) => {
    try {
        const response = await databases.listDocuments(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_USERS,
            []
        )
        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const createUser = async (req, res) => {
    console.log('create user document starts')
    const newUser = req.body
    console.log(newUser)

    try {
        const response = await databases.createDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_USERS,
            ID.unique(),
            {
                name: newUser.name,
                email: newUser.email,
                nickname: newUser.nickname,
                todos_completed: 0,
                ui_theme: 'light-mode',
                userId: newUser.userId,
            }
        )

        res.status(201).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}