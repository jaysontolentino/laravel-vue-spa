import { defineStore } from 'pinia'
import axios, {privateAxios} from '../utils/axios'
import Cookies from 'js-cookie'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        error: null,
        loading: false,
        logoutLoading: false
    }),
    getters: {
        authUser(state) {
            return state.user
        },
        isAdmin(state) {

            if(state.user) return state.user.role === 'admin'
            
            return false
        }
    },
    actions: {
        async login(data) {
            try {

                this.loading = true
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/sanctum/csrf-cookie`)
                const response = await axios.post('auth/login', data)
                
                const {roles, user, token} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null

                Cookies.set('token', token)

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
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/sanctum/csrf-cookie`)
                const response = await axios.post('auth/register', data)
                
                const {roles, user} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null

                Cookies.set('token', token)

                this.router.push('/welcome')

            } catch (error) {
                this.error = error.response.data
                
            } finally {
                this.loading = false
            }
        },
        async logout() {

            try {

                console.log('Token -> ', privateAxios.defaults)
                
                this.logoutLoading = true
                await axios.post('auth/logout', {}, {
                    headers: {
                        Authorization: 'Bearer ' + Cookies.get('token')
                    }
                })

                this.user = null
                this.error = null

                Cookies.remove('token', {path: '/'})

                this.router.push('/')

            } catch (error) {
                this.error = error.response.data
                
            } finally {
                this.logoutLoading = false
            }
        },
        async fetchAuthUser() {
            try {
                
                const response = await privateAxios.get('auth-user')
                
                const {roles, user} = response.data

                this.user = {
                    username: user.username,
                    email: user.email,
                    role: roles[0]
                }

                this.error = null

            } catch (error) {
               
            }
        }
    }
})