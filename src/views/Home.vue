<script setup>
import { storeToRefs } from 'pinia'
import RegisterForm from './../components/RegisterForm.vue'
import { useAuthStore } from '../store/auth'

const { authUser } = storeToRefs(useAuthStore())

</script>

<template>
    <div class="w-screen min-h-screen h-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8">
        <nav class="flex justify-between">
            <RouterLink to="/" class="text-xl text-white font-medium">Laravel App</RouterLink>

            <div v-if="authUser" class="flex gap-6">
                <span class="text-slate-100 hidden md:flex">Hello, {{ authUser.username }}</span>
            </div>
            <div v-else class="flex gap-6">
                <span class="text-slate-100 hidden md:flex">Already have an account? </span>
                <RouterLink to="/login" class="text-white font-bold">Sign In</RouterLink>
            </div>
        </nav>

        <section class="container mx-auto mt-32">

            <div v-if="authUser" class="flex flex-col w-full items-center">
                <div class="flex flex-col gap-8 text-center pr-8 w-full lg:w-3/4">
                    <h1 class="text-slate-50 text-4xl font-semibold tracking-wider lg:text-6xl">
                        Welcome to the Laravel and Vue App
                    </h1>

                    <p class="text-slate-50 text-xl lg:text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit rerum et fuga inventore cupiditate harum, quaerat quae iusto accusantium voluptatibus quisquam quibusdam quis autem iure, nulla nemo accusamus ullam </p>

                    <RouterLink to="/welcome" class="w-full bg-slate-50 text-slate-900 text-xl font-medium py-6 rounded-md">
                            Go to Dashboard
                    </RouterLink> 
                </div>
            </div>

            <div v-else class="flex flex-col w-full md:flex-row">
                <div class="w-full flex flex-col gap-8 text-center pr-8 lg:w-2/4 lg:text-left lg:pl-8">
                    <h1 class="text-slate-50 text-4xl font-semibold tracking-wider lg:text-6xl">
                        Welcome to the Laravel and Vue App
                    </h1>

                    <p class="text-slate-50 text-xl lg:text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit rerum et fuga inventore cupiditate harum, quaerat quae iusto accusantium voluptatibus quisquam quibusdam quis autem iure, nulla nemo accusamus ullam </p>

                    <RouterLink to="/register" class="w-full bg-slate-50 text-slate-900 text-xl font-medium py-6 rounded-md lg:hidden">
                            Create an account
                    </RouterLink> 
                </div>

                <div class="lg:w-2/4 lg:pl-8">
                    <div class="hidden lg:block">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            
        </section>
    </div>
</template>