<script setup>
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import Alert from '../../components/ui/Alert.vue'
import Input from '../../components/ui/Input.vue'
import { useUsersStore } from '../../store/users'

const { data, loading, error, deleteUserError, deleteUserLoading } = storeToRefs(useUsersStore())
const { loadUsers, deleteUser } = useUsersStore()

const searchValue = ref('')
const itemsSelected = ref([])

const items = ref([])

const serverItemsLength = ref(0)
const serverOptions = ref({
    "filter[all]": "",
    page: 1,
    rowsPerPage: 10
})

const loadFromServer = async () => {
    await loadUsers(serverOptions.value)

    items.value = data.value.data
    serverItemsLength.value = data.value.total
}

loadFromServer()

watch(
    serverOptions,
    (value) => {
        loadFromServer()
    },
    {
        deep: true
    }
)

const headers = [
    { text: "ID", value: "id", },
    { text: "Username", value: "username", },
    { text: "Email Address", value: "email", },
    { text: "Phone", value: "phone", },
    { text: "User Type", value: "role", },
    { text: "Actions", value: "actions", }
]


const deleteBtnText = computed(() => {
    const count = itemsSelected.value.length
    if(count === usersCount) return 'Delete all items'
    else if(count > 1) return `Delete ${count} items`
    else if(count <= 1) return `Delete ${count} item`
})

const onDeleteButton = () => {
    console.log(itemsSelected.value)
}

const onItemDelete = async ({id}) => {
    const confirmed = confirm('Are you sure?')

    if(confirmed) {
        await deleteUser(id)
        loadFromServer()
    }
}

</script>

<template>
    <div class="bg-white flex flex-col gap-12 py-8 px-12 min-h-[300px] rounded-md shadow-md">

        <Alert v-if="error" type="error">{{ error.message }}</Alert>
        
        <div class="flex justify-between items-center">
            <h3 class="text-slate-500 text-2xl font-medium text-left">User Management</h3>

            <RouterLink 
            class="py-2 px-3 bg-emerald-500 text-white font-medium rounded-md hover:bg-emerald-400" 
            :to="{ name: 'add-user' }">
                <Icon name="fa-user-plus"  />
                New User
            </RouterLink>
        </div>

        <div class="flex flex-col items-start gap-4">
            <Input type="text" placeholder="Search..." v-model.lazy="serverOptions['filter[all]']" />

            <button 
            v-if="itemsSelected.length" 
            class="bg-green-500 text-slate-50 py-1 px-3 rounded"
            @click="onDeleteButton">
            {{ deleteBtnText }}
            </button>

            <div class="w-full">
                <DataTable
                buttons-pagination
                v-model:server-options="serverOptions"
                :loading="loading"
                :items="items"
                :server-items-length="serverItemsLength"
                :headers="headers" 
                :search-value="searchValue">

                    <template #item-role="item">
                        <div>
                            {{ item.roles[0].name }}
                        </div>
                    </template>

                    <template #item-actions="item">
                        <div class="flex gap-2">
                            <button 
                            v-if="item.roles[0].name === 'Admin'"
                            disabled
                            class="border-2 border-gray-300 p-1 rounded text-gray-500 hover:bg-gray-200" >
                                <Icon 
                                name="fa-regular-trash-alt"
                                scale="0.8"
                                />
                            </button>

                            <button 
                            v-if="item.roles[0].name === 'User'"
                            class="border-2 border-red-300 p-1 rounded text-red-500 hover:bg-red-200 disabled:border-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-200 disabled:cursor-wait" 
                            :disabled="deleteUserLoading"
                            @click="onItemDelete(item)">
                                <Icon 
                                name="fa-regular-trash-alt"
                                scale="0.8"
                                />
                            </button>
                            <RouterLink 
                            class="border-2 border-blue-300 p-1 rounded text-blue-500 hover:bg-blue-200"
                            :to="{ name: 'update-user', params: { id: item.id }}">
                                <Icon 
                                name="fa-regular-edit"
                                scale="0.8"
                                />
                            </RouterLink>
                        </div>
                    </template>
                </DataTable>
            </div>
        </div>
        
    </div>
</template>