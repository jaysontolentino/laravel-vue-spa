import { defineStore } from 'pinia'
import axios, {useAuthAxios} from '../utils/axios'
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
            console.log('register data ', data)
            try {
                
                this.loading = true
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/sanctum/csrf-cookie`)
                const response = await axios.post('auth/register', data)
                
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
        async logout() {

            const authAxios = useAuthAxios()

            try {
                
                this.logoutLoading = true
                await authAxios.post('auth/logout')

                this.user = null
                this.error = null

                Cookies.remove('token', {path: '/'})

                this.router.push({ name: 'home' })

            } catch (error) {
                this.error = error.response.data
                
            } finally {
                this.logoutLoading = false
            }
        },
        async fetchAuthUser() {

            const authAxios = useAuthAxios()

            try {
                
                const response = await authAxios.get('auth-user')
                
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