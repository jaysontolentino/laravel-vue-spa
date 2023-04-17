<script setup>
import {computed} from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentPath = computed(() => route.name)

</script>

<template>
    <nav class="w-full bg-white/50 backdrop-blur py-5 px-8 shadow-sm border-b-2 border-slate-200 fixed top-0 left-0">
        <div class="container mx-auto">
            <div class="flex justify-between">
                <RouterLink to='/' class="text-xl text-blue-500 md:text-lg">Laravue</RouterLink>

                <div class="flex gap-2">
                    <RouterLink v-if="currentPath === 'register' || currentPath === 'welcome'" to='/login' class="bg-blue-500 text-white py-2 px-4 rounded">Login</RouterLink>
                    <RouterLink v-if="currentPath === 'login'" to='/register' class="bg-blue-500 text-white py-2 px-4 rounded">Register</RouterLink>
                </div>
                
            </div>
            
        </div>
    </nav>
</template>