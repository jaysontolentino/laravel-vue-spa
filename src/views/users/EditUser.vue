<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from 'vue-router'

import Input from "../../components/ui/Input.vue"
import Button from "../../components/ui/Button.vue"
import Alert from '../../components/ui/Alert.vue'

import { useAuthAxios } from "../../utils/axios"
import { useUsersStore } from "../../store/users"

const { params } = useRoute()
const router = useRouter()

const axios = useAuthAxios()
const { 
    getUserLoading, 
    updateUserLoading, 
    getUserError ,
    updateUserError
} = storeToRefs(useUsersStore())

const { getUser, updateUser } = useUsersStore()

const formData = ref({
  username: "",
  email: "",
  phone: "",
  role: "",
});

const loadUser = async () => {
    try {
        const response = await getUser(params.id)

        const { user, role } = response.data
        
        formData.value = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: role[0]
        }
    } catch (error) {
        router.push({ name: 'users' })
    }
}

const roles = ref([])

const loadRoles = async () => {
    const response = await axios.get('roles')
    roles.value = response.data
}
loadUser()
loadRoles()

</script>

<template>
  <div class="flex min-h-[300px] justify-center">
    <span v-if="getUserLoading" class="text-white text-center font-medium">Loading...</span>
    <div v-else class="w-2/5 bg-white rounded-sm shadow-sm py-8 px-10 flex flex-col">

      <Alert v-if="getUserError" type="error">
        <ul class="text-left list-disc px-4">
            <li v-for="(error, i) in getUserError.errors" :key="i">
                {{ error }}
            </li>
        </ul>
      </Alert>

      <Alert v-if="updateUserError" type="error">
        <ul class="text-left list-disc px-4">
            <li v-for="(error, i) in updateUserError.errors" :key="i">
                {{ error }}
            </li>
        </ul>
      </Alert>

      <div class="flex justify-between items-center mb-6">
        <h3 class="text-slate-500 text-2xl font-medium text-left">
          Update User
        </h3>
      </div>

      <div class="flex flex-col gap-4">
        <form @submit.prevent="updateUser($route.params.id, formData)" class="flex flex-col gap-4">
          <div class="flex flex-col">
            <Input
              type="text"
              v-model="formData.username"
              placeholder="Username"
            />
          </div>

          <div class="flex flex-col">
            <Input
              type="email"
              v-model="formData.email"
              placeholder="Email Address"
            />
          </div>

          <div class="flex flex-col">
            <Input type="number" v-model="formData.phone" placeholder="Phone" />
          </div>

          <div class="flex flex-col">
            <select
              v-model="formData.role"
              class="py-2 px-3 border border-slate-300 outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md"
            >
              <option value="">--- Select User Type ---</option>
              <option v-for="role in roles" :key="role.id" :value="role.slug">{{ role.name }}</option>
            </select>
          </div>

          <div>
            <Button size="full" type="submit" :isLoading="updateUserLoading">
              Update
            </Button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>
