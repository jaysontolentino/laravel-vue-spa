<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/auth';

const route = useRoute()
const { isAdmin, user } = storeToRefs(useAuthStore())
const {logout} = useAuthStore()

const signOut = async () => {
    await logout()
}

const unsubscribe = () => {
    // Do nothing
    alert('Successfully unsubscribed!')
}

</script>

<template>
    <nav class="w-full bg-white/60 backdrop-blur py-3 px-8 fixed top-0 left-0 z-50">
        <div class="container mx-auto">
            <div class="flex justify-between">

                <RouterLink to="/" class="text-xl text-blue-500 font-medium">
                    Laravel App
                </RouterLink>

                <div class="flex gap-2">

                    <RouterLink 
                        v-if="isAdmin && route.name !== 'users'"
                        to='/users' 
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400">
                        View Records
                    </RouterLink>

                    <button
                        v-if="!isAdmin && user"
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400"
                        @click="unsubscribe">
                        Unsubscribe
                    </button>

                    <button @click="signOut" class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400">Logout</button>
                </div>
                
            </div>
            
        </div>
    </nav>
</template>