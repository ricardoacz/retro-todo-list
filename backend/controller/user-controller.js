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

export const updateUser = async (req, res) => {
    console.log('update user starts')
    const id = req.params.id
    console.log(id, req.body)

    const updatedUser = {}

    if (req.body.name !== undefined) updatedUser.name = req.body.name
    if (req.body.nickname !== undefined) updatedUser.nickname = req.body.nickname
    if (req.body.email !== undefined) updatedUser.email = req.body.email
    if (req.body.ui_theme !== undefined) updatedUser.ui_theme = req.body.ui_theme

    console.log(updatedUser)

    try {
        const response = await databases.updateDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_USERS,
            id,
            updatedUser
        )

        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const deleteUser = async (req, res) => {
    console.log('delete start starts')
    const id = req.params.id
    console.log(id)

    try {
        const response = await databases.deleteDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_USERS,
            id,
        )

        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}