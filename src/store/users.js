import { defineStore } from 'pinia'
import { useAuthAxios } from '../utils/axios'

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        data: [],
        loading: false,
        addUserLoading: false,
        getUserLoading: false,
        updateUserLoading: false,
        error: null,
        addUserError: null,
        getUserError: null,
        updateUserError: null
    }),
    getters: {
        usersCount(state) {
            return state.users.length
        }
    },
    actions: {
        async loadUsers(queries) {
            const axios = useAuthAxios()

            const params = new URLSearchParams(queries).toString()

            try {
                this.loading = true

                const response = await axios.get(`users?include=roles&${params}`)

                this.data = response.data
                this.error = null
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        },
        async getUser(id) {
            
            const axios = useAuthAxios()

            try {
                this.getUserLoading = true

                const response = await axios.get(`users/${id}`)

                this.getUserError = null

                return response

            } catch (error) {
                this.getUserError = {errors: [error.message]}
                throw error
            } finally {
                this.getUserLoading = false
            }
        },
        async addUser(data) {

            const axios = useAuthAxios()

            try {
                this.addUserLoading = true

                await axios.post('users', data)

                this.router.push({ name: 'users' })
                this.addUserError = null
            } catch (error) {
                this.addUserError = error.response.data
            } finally {
                this.addUserLoading = false
            }
        },
        async updateUser(id, data) {

            const axios = useAuthAxios()

            try {
                this.updateUserLoading = true

                await axios.put(`users/${id}`, data)

                this.router.push({ name: 'users' })
                this.updateUserError = null
            } catch (error) {
                this.updateUserError = error.response.data
            } finally {
                this.updateUserLoading = false
            }
        },
    }
})