import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import { create } from "zustand";

export const useTodoStore = create((set) => ({
    todos: [],

    getTodos: async () => {
        const user = await account.get()
        try {
            const response = await fetch(`api/todo?userId=${user.$id}`)
            const data = await response.json()
            set((state) => {
                const todoDocs = [...data.response.documents]
                const sortByCreatedAt = todoDocs.sort((a,b) => {
                    return new Date(a.$createdAt) - new Date(b.$createdAt)
                })
                const sortUpdatedTodos = [...sortByCreatedAt].sort((a, b) => {
                    return (b.important === true) - (a.important === true)
                })
                return {todos: sortUpdatedTodos}
            })
        } catch (error) {
            console.error(error)
        }
    },

    createTodo: async (newTodo) => {
        const user = await account.get()
        newTodo.userId = user.$id
        try {
            const response = await fetch(`api/todo`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTodo)
            })
            const data = await response.json()
            set((state) => ({todos: [...state.todos, data.response]}))
        } catch (error) {
            console.error(error)
        }
    },

    updateTodo: async (updatedTodo) => {
        const user = await account.get()
        try {
            const response = await fetch(`api/todo/${updatedTodo.$id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedTodo)
            })
            const data = await response.json()

            set((state) => {
                const fetchedUpdatedTodos = state.todos.map((todo) => 
                    todo.$id === updatedTodo.$id ? data.response : todo
                )
                const sortByCreatedAt = [...fetchedUpdatedTodos].sort ((a,b) => {
                    return new Date(a.$createdAt) - new Date(b.$createdAt)
                })
                const sortUpdatedTodos = [...sortByCreatedAt].sort((a, b) => {
                    return (b.important === true) - (a.important === true)
                })
                return {todos: sortUpdatedTodos}
            })

        } catch (error) {
            console.error(error)
        }
    },

    deleteTodo: async (deletedTodo) => {
        const user = await account.get()
        try {
            const response = await fetch(`api/todo/${deletedTodo.$id}`, {
                method: "DELETE",
            })
            const data = await response.json()
            set((state) => ({
                todos: state.todos.filter((todo) => 
                    todo.$id !== deletedTodo.$id)
            }))

        } catch (error) {
            console.error(error)
        }
    }
}))