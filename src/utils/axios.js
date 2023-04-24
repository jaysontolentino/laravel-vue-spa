import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('token')

export default axios