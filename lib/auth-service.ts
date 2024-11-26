import axios from 'axios'
import { signIn, signOut } from "next-auth/react"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://www.vibevision.ai'

export const authService = {
    async login(email: string, password: string) {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password
            })

            if (result?.error) {
                throw new Error(result.error)
            }

            return result
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    },

    async signup(userData: {
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string
    }) {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                password: userData.password
            })

            return response.data
        } catch (error) {
            console.error('Signup failed:', error)
            throw error
        }
    },

    async googleLogin() {
        await signIn('google')
    },

    async logout() {
        await signOut({ redirect: true, callbackUrl: '/' })
    },

    async resetPassword(email: string) {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/reset-password`, { email })
            return response.data
        } catch (error) {
            console.error('Password reset failed:', error)
            throw error
        }
    }
}