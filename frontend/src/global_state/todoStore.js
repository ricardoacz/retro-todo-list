import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import { create } from "zustand";

export const useTodoStore = create((set) => ({
    todos: [],

    getTodos: async () => {
        console.log("Get todos starts")
        const user = await account.get()
        try {
            const response = await fetch(`api/todo?userId=${user.$id}`)
            const data = await response.json()
            console.log(data.response.documents)
            set((state) => ({todos: data.response.documents}))
        } catch (error) {
            console.error(error)
        }
    },

    createTodo: async (newTodo) => {
        console.log("Create todo starts", newTodo)
        const user = await account.get()
        newTodo.userId = user.$id
        try {
            const response = await fetch(`api/todo`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newTodo)
            })
            const data = await response.json()
            console.log(data.response)
            set((state) => ({todos: [...state.todos, data.response]}))
        } catch (error) {
            console.error(error)
        }
    },

    updateTodo: async (updatedTodo) => {
        console.log("Update todo starts", updatedTodo)
        const user = await account.get()
        try {
            const response = await fetch(`api/todo/${updatedTodo.$id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedTodo)
            })
            const data = await response.json()
            console.log(data.response)

            set((state) => {
                const fetchedUpdatedTodos = state.todos.map((todo) => 
                    todo.$id === updatedTodo.$id ? data.response : todo
                )
                const sortUpdatedTodos = [...fetchedUpdatedTodos].sort((a, b) => {
                    return (b.important === true) - (a.important === true)
                })
                return {todos: sortUpdatedTodos}
            })

        } catch (error) {
            console.error(error)
        }
    },

    deleteTodo: async (deletedTodo) => {
        console.log("Delete todo starts", deletedTodo)
        const user = await account.get()
        try {
            const response = await fetch(`api/todo/${deletedTodo.$id}`, {
                method: "DELETE",
            })
            const data = await response.json()
            console.log(data.response)
            set((state) => ({
                todos: state.todos.filter((todo) => 
                    todo.$id !== deletedTodo.$id)
            }))

        } catch (error) {
            console.error(error)
        }
    }
}))