<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/auth';

const route = useRoute()
const { isAdmin } = storeToRefs(useAuthStore())

</script>

<template>
    <nav class="w-full bg-white/90 backdrop-blur py-3 px-8 fixed top-0 left-0">
        <div class="container mx-auto">
            <div class="flex justify-between">

                <RouterLink to="/" class="text-xl text-blue-500 font-medium">
                    Laravel App
                </RouterLink>

                <div class="flex gap-2">

                    <RouterLink 
                        v-if="isAdmin && route.name === 'welcome'"
                        to='/users' 
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400">
                        View Records
                    </RouterLink>

                    <button
                        v-if="!isAdmin"
                        class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400">
                        Unsubscribe
                    </button>

                    <button class="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-400">Logout</button>
                </div>
                
            </div>
            
        </div>
    </nav>
</template>