import { ID } from "appwrite";
import { account } from "../appwriteConfig";
import { create } from "zustand";

export const useAuth = create((set) => ({
    user: null,
    loading: false,

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

        try {
            await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name,
                userInfo.nickname
            )
        } catch (error) {
            console.error(error)
        }

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
    
}))