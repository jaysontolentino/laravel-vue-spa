import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './../pages/auth/Login.vue'
import RegisterPage from './../pages/auth/Register.vue'
import WelcomePage from './../pages/Welcome.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/',
        name: 'welcome',
        component: WelcomePage
    },

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})