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
            console.log(data)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}))