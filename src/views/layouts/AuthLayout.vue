<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
    <div class="w-screen min-h-screen h-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8">
        <nav class="flex justify-between">
            <RouterLink to="/" class="text-xl text-white font-medium">Laravel App</RouterLink>

            <div v-if="route.name === 'login'"  class="flex gap-6">
                <span class="text-slate-100 hidden md:flex">No Account? </span>
                <RouterLink to="/register" class="text-white font-bold">Sign Up</RouterLink>
            </div>

            <div v-if="route.name === 'register'"  class="flex gap-6">
                <span class="text-slate-100 hidden md:flex">Already have an Account? </span>
                <RouterLink to="/login" class="text-white font-bold">Sign In</RouterLink>
            </div>
        </nav>

        <section class="container mx-auto mt-32">

            <slot />
            
        </section>
    </div>
</template>