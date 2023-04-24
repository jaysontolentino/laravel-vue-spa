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
        component: () => import('./../views/UserList.vue'),
        meta: {
            layout: 'AppLayout',
            requiresAuth: true,
            permission: 'admin'
        }
    },

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

    if((to.path === '/login' || to.path === '/register') && user) {
        return next({path: '/welcome'})
    }

    if(to.matched.some(rec => rec.meta.requiresAuth)) {

        if(!user) {
            return next({path: '/login'})
        }
    } 
    
    next()

})

export default router