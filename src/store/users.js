import { defineStore } from 'pinia'
import { useAuthAxios } from '../utils/axios'

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        data: [],
        loading: false,
        error: null
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

                console.log(response.data)

                this.data = response.data
                this.error = null
            } catch (error) {
                this.error = error
            } finally {
                this.loading = false
            }
        }
    }
})