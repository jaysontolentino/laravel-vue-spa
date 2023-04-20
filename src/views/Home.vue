<script setup>
import RegisterForm from './../components/RegisterForm.vue'
</script>

<template>
    <div class="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8">
        <nav class="flex justify-between">
            <RouterLink to="/" class="text-xl text-white font-medium">Laravel App</RouterLink>

            <div class="flex gap-6">
                <span class="text-slate-100 hidden md:flex">Already have an account? </span>
                <RouterLink to="/login" class="text-white font-bold">Sign In</RouterLink>
            </div>
        </nav>

        <section class="container mx-auto mt-32">

            <div class="flex flex-col w-full md:flex-row">
                <div class="w-full flex flex-col gap-8 text-center pr-8 md:w-2/4 md:text-left">
                    <h1 class="text-slate-50 text-4xl font-semibold tracking-wider md:text-6xl">
                        Welcome to the Laravel and Vue Demo App
                    </h1>

                    <p class="text-slate-50 text-xl md:text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, odit rerum et fuga inventore cupiditate harum, quaerat quae iusto accusantium voluptatibus quisquam quibusdam quis autem iure, nulla nemo accusamus ullam </p>

                    <RouterLink to="/register" class="w-full bg-slate-50 text-slate-900 text-xl font-medium py-6 rounded-md md:hidden">
                            Create an account
                    </RouterLink> 
                </div>

                <div class="w-2/4 pl-8">
                    <div class="hidden md:block">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            
        </section>
    </div>
</template>