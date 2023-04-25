<script setup>
import { ref } from 'vue'
import Input from '../../components/ui/Input.vue'
import Button from '../../components/ui/Button.vue'

const formData = ref({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',

})
</script>

<template>
    <div class="flex min-h-[300px] justify-center">

        <div class="w-2/5 bg-white rounded-sm shadow-sm py-8 px-10 flex flex-col">

            <div class="flex justify-between items-center mb-6">
                <h3 class="text-slate-500 text-2xl font-medium text-left">Add New User</h3>
            </div>

            <div class="flex flex-col gap-4">
                <form @submit.prevent="" class="flex flex-col gap-4">
            
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
                    k33pOut

                    <div class="flex flex-col">
                        <select 
                        v-model="formData.role"
                        class="py-2 px-3 border border-slate-300 outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md">
                            <option value="">--- Select User Type ---</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div>
                        <Button size="full" type="submit" :isLoading="loading">
                            Submit
                        </Button>
                    </div>

                    <Alert v-if="error" type="error">{{ error.message }}</Alert>
                </form>
            </div>

        </div>
        
    </div>
</template>