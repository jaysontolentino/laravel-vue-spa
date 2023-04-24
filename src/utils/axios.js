import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}/api`

const token = Cookies.get('token')

export const privateAxios = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    }
})

export default axios