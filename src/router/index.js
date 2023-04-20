import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./../views/Home.vue'),
        meta: {
            layout: 'DefaultLayout',
            requiredAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./../views/Login.vue'),
        meta: {
            layout: 'AuthLayout',
            requiredAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./../views/Register.vue'),
        meta: {
            layout: 'AuthLayout',
            requiredAuth: false
        }
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('./../views/Welcome.vue'),
        meta: {
            layout: 'AppLayout',
            requiredAuth: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('./../views/UserList.vue'),
        meta: {
            layout: 'AppLayout',
            requiredAuth: true,
            permission: 'admin'
        }
    },

]

export const router = createRouter({
    history: createWebHistory(),
    routes
})