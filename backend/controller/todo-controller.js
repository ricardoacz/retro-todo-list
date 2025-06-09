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
    res.send('Todos would be here')
}

export const markTodoDone = async (req, res) => {
    res.send('Todos would be here')
}

export const unmarkTodoDone = async (req, res) => {
    res.send('Todos would be here')
}

export const markTodoImportant = async (req, res) => {
    res.send('Todos would be here')
}

export const unmarkTodoImportant = async (req, res) => {
    res.send('Todos would be here')
}

export const deleteTodo = async (req, res) => {
    res.send('Todos would be here')
}

