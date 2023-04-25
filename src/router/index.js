import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./../views/Home.vue'),
        meta: {
            layout: 'DefaultLayout',
            requiresAuth: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./../views/Login.vue'),
        meta: {
            layout: 'AuthLayout',
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('./../views/Register.vue'),
        meta: {
            layout: 'AuthLayout',
            requiresAuth: false
        }
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('./../views/Welcome.vue'),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true
        }
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('./../views/users/UserList.vue'),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            permission: 'admin'
        }
    },
    {
        path: '/users/add',
        name: 'add-user',
        component: () => import('./../views/users/AddUser.vue'),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            permission: 'admin'
        }
    },
    {
        path: '/users/:id',
        name: 'update-user',
        component: () => import('./../views/users/EditUser.vue'),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            permission: 'admin'
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    let user = null

    const {fetchAuthUser } = useAuthStore()

    await fetchAuthUser().then(() => {
        user = useAuthStore().user
    })

    if((to.name === 'login' || to.name === 'register') && user) {
        return next({name: 'welcome'})
    }

    if(to.matched.some(rec => rec.meta.requiresAuth)) {

        if(!user) {
            return next({name: 'login'})
        }

        if(to.path.includes('users/') && (to.meta.permission !== user.role)) {
            return next({ name: 'welcome' })
        }
    } 
    
    next()

})

export default router