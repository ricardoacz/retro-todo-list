import { client, databases, account } from '../config/appwrite.js'
import { ID, Query } from 'node-appwrite'

export const getTodos = async (req, res) => {
    try {
        const response = await databases.listDocuments(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_TODOS,
            []
        )
        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const createTodo = async (req, res) => {
    console.log('create todo starts')
    const newTodo = req.body
    console.log(newTodo)

    try {
        const response = await databases.createDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_TODOS,
            ID.unique(),
            {
                todo: newTodo.todo,
                user: newTodo.user,
                important: false,
                completed: false
            }
        )

        res.status(201).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const updateTodo = async (req, res) => {
    console.log('update todo starts')
    const id = req.params.id
    console.log(id, req.body)
    const updatedTodo = {}

    if (req.body.todo !== undefined) updatedTodo.todo = req.body.todo
    if (req.body.completed !== undefined) updatedTodo.completed = req.body.completed
    if (req.body.important !== undefined) updatedTodo.important = req.body.important

    
    console.log(updatedTodo)

    // try {
    //     const response = await databases.getDocument(
    //         process.env.DB,
    //         process.env.APPWRITE_COLLECTION_TODOS,
    //         id,
    //         []
    //     )

    //     console.log("Document exists")
    // } catch (error) {
    //     console.error(error)
    //     res.status(404).json({success: false, message: "Not found"})
    // }

    try {
        const response = await databases.updateDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_TODOS,
            id,
            updatedTodo
        )

        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const deleteTodo = async (req, res) => {
    console.log('delete todo starts')
    const id = req.params.id
    console.log(id, req.body)

    try {
        const response = await databases.deleteDocument(
            process.env.DB,
            process.env.APPWRITE_COLLECTION_TODOS,
            id,
        )

        res.status(200).json({success: true, response})
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: "Server error"})
    }
}
