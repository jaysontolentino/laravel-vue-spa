<script setup>
import { storeToRefs } from 'pinia'
import {ref} from 'vue'
import {useAuthStore} from './../store/auth'

import Input from './ui/Input.vue'
import Button from './ui/Button.vue'
import Alert from './ui/Alert.vue'

const {  authUser, error, loading } = storeToRefs(useAuthStore())
const { fetchAuthUser, login } = useAuthStore()

const formData = ref({
    username: '',
    password: ''
})


</script>

<template>
    <div class="w-full bg-slate-100 border rounded py-6 px-8 md:w-[380px]">

        <h1 class="text-center text-2xl mb-6">Sign In</h1>

        <form @submit.prevent="login(formData)" class="flex flex-col gap-4">
            
            <div class="flex flex-col">
                <Input type="text" v-model="formData.username" placeholder="Username or Email" />
            </div>

            <div class="flex flex-col">
                <Input type="password" v-model="formData.password" placeholder="Password" />
            </div>

            <div>
                <Button size="full" type="submit" :isLoading="loading">
                    Login
                </Button>
            </div>

            <Alert v-if="error" type="error">{{ error.message }}</Alert>
        </form>

        <button @click="fetchAuthUser">Get current user</button>

        <pre>
            {{ authUser }}
        </pre>
    </div>
</template>