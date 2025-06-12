import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import { create } from "zustand";

export const useAuth = create((set) => ({
    user: null,
    loading: false,
    documentUser: null,

    loginUser: async (userInfo) => {
        set({ loading: true })
        let accountDetails = null
        try {
            await account.createEmailPasswordSession(userInfo.email, userInfo.password)
            accountDetails = await account.get()
            set({ user: accountDetails })
        } catch (error) {
            console.error(error)
        }
        set({ loading: false })
        return accountDetails
    },

    registerUser: async (userInfo) => {
        set({ loading: true })
        let accountDetails = null
        const userIdUnique = ID.unique()
        userInfo.userId = userIdUnique

        // Create user account
        try {
            await account.create(
                userInfo.userId,
                userInfo.email,
                userInfo.password1,
                userInfo.name,
                userInfo.nickname
            )
        } catch (error) {
            console.error(error)
        }
        // Create user document
        try {
            const response = fetch('/api/user', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(userInfo)
            })
            const data = await response.json()
            console.log("User document created")
        } catch (error) {
            console.error(error)
        }

        // Log in
        try {
            await account.createEmailPasswordSession(userInfo.email, userInfo.password1)
            accountDetails = await account.get()
            set({ user: accountDetails })
        } catch (error) {
            console.error(error)
        }
        set({ loading: false })
        return accountDetails
    },

    logoutUser: async () => {
        await account.deleteSessions()
        location.reload()
        set({ user: null })
    },

    checkUserStatus: async () => {
        try {
            const accountDetails = await account.get()
            set({ user: accountDetails })
            return accountDetails
        } catch (error) {
            set({ user: null })
        return false
        }
    },

    getUser: async () => {
        set({loading: true})
        console.log("Get user starts")
        const user = await account.get()
        try {
            const response = await fetch(`api/user?userId=${user.$id}`)
            const data = await response.json()
            console.log(data.response)
            set((state) => ({documentUser: data.response}))
        } catch (error) {
            console.error(error)
        }
        set({loading: false})
    },

    updatePassword: async (passwords) => {
        set({loading: true})
        console.log("Start changing password")
        try {
            const result = await account.updatePassword(
            password.new,
            password.old
        )
        } catch (error) {
            console.error(error)
        }
        set({loading: false})
    }


    
}))