import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import { create } from "zustand";

export const useTodoStore = create((set) => ({
    todos: [],
    setTodos: (todos) => set({todos}),

    getTodos: async () => {
        console.log("Get todos starts")
        const user = await account.get()
        try {
            const response = await fetch(`api/todo?userId=${user.$id}`)
            const data = await response.json()
            console.log(data.response.documents)
            set((state) => ({todos: [...state.todos, data.response.documents]}))
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
    }
}))