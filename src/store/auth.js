import { defineStore } from 'pinia'
import axios from '../utils/axios'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        error: null,
        loading: false
    }),
    getters: {
        authUser(state) {
            return state.user
        },
        isAdmin(state) {
            return state.user.role === 'admin'
        }
    },
    actions: {
        async login(data) {
            try {

                this.loading = true
                await axios.get('sanctum/csrf-cookie')
                const response = await axios.post('api/auth/login', data)
                
                const {roles, user} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null

                this.router.push('/welcome')
            } catch (error) {
                this.error = error.response.data
                
            } finally {
                this.loading = false
            }
        },
        async register(data) {
            try {
                
                this.loading = true
                await axios.get('sanctum/csrf-cookie')
                const response = await axios.post('api/auth/register', data)
                
                const {roles, user} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null
            } catch (error) {
                this.error = error.response.data
                
            } finally {
                this.loading = false
            }
        },
        async fetchAuthUser() {
            try {
                
                await axios.get('sanctum/csrf-cookie')
                const response = await axios.get('api/auth-user')
                
                const {roles, user} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null
            } catch (error) {
                //this.error = error.response.data
            }
        }
    }
})