<script setup>
import { storeToRefs } from 'pinia'
import {ref} from 'vue'
import {useAuthStore} from './../store/auth'

import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import Alert from './ui/Alert.vue'

const { user, error, loading } = storeToRefs(useAuthStore())
const { register } = useAuthStore()

const formData = ref({
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
})


</script>

<template>
    <div class="w-full bg-white border rounded py-6 px-8 md:w-[380px]">

        <h1 class="text-center text-2xl mb-6">Sign Up</h1>

        <form @submit.prevent="register(formData)" class="flex flex-col gap-4">
            
            <div class="flex flex-col">
                <Input type="text" v-model="formData.username" placeholder="Username" />
            </div>

            <div class="flex flex-col">
                <Input type="email" v-model="formData.email" placeholder="Email Address" />
            </div>

            <div class="flex flex-col">
                <Input type="number" v-model="formData.phone" placeholder="Phone" />
            </div>

            <div class="flex flex-col">
                <Input type="password" v-model="formData.password" placeholder="Password" />
            </div>

            <div class="flex flex-col">
                <Input type="password" v-model="formData.password_confirmation" placeholder="Retype Password" />
            </div>

            <div>
                <Button size="full" type="submit" :isLoading="loading">
                    Register
                </Button>
            </div>

            <Alert v-if="error" type="error">{{ error.message }}</Alert>
        </form>
    </div>
</template>