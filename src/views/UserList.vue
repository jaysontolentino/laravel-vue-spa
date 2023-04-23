<script setup>
import { ref, computed } from 'vue'
import Input from './../components/ui/Input.vue'

const searchValue = ref('')
const itemsSelected = ref([])


const headers = [
    { text: "Name", value: "name" },
    { text: "Height (cm)", value: "height", sortable: true },
    { text: "Weight (kg)", value: "weight", sortable: true },
    { text: "Age", value: "age", sortable: true },
    { text: "Actions", value: "actions", sortable: false }
]

const items = [
    { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    { "name": "James", "height": 180, "weight": 75, "age": 21 },
    { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    { "name": "James", "height": 180, "weight": 75, "age": 21 },
    { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    { "name": "James", "height": 180, "weight": 75, "age": 21 },
    { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    { "name": "James", "height": 180, "weight": 75, "age": 21 },
    { "name": "Jordan", "height": 181, "weight": 73, "age": 22 },
    { "name": "Curry", "height": 178, "weight": 77, "age": 20 },
    { "name": "James", "height": 180, "weight": 75, "age": 21 },
    { "name": "Jordan", "height": 181, "weight": 73, "age": 22 }
]

const deleteBtnText = computed(() => {
    const count = itemsSelected.value.length
    if(count === items.length) return 'Delete all items'
    else if(count > 1) return `Delete ${count} items`
    else if(count <= 1) return `Delete ${count} item`
})

const onDeleteButton = () => {
    console.log(itemsSelected.value)
}

const onItemDelete = (item) => {
    console.log('Deleting...', item)
}

const onItemUpdate = (item) => {
    console.log('Updating...', item)
}
</script>

<template>
    <div class="bg-white flex flex-col gap-12 py-8 px-12 min-h-[300px] rounded-md shadow-md">
        
        <h3 class="text-slate-500 text-2xl font-medium text-left">User Management</h3>

        <div class="flex flex-col items-start gap-4">
            <Input type="text" placeholder="Search..." v-model="searchValue" />

            <button 
            v-if="itemsSelected.length" 
            class="bg-green-500 text-slate-50 py-1 px-3 rounded"
            @click="onDeleteButton">
            {{ deleteBtnText }}
            </button>

            <div class="w-full">
                <DataTable
                show-index
                v-model:items-selected="itemsSelected"
                buttons-pagination
                :items="items" 
                :headers="headers" 
                :search-value="searchValue">
                    <template #item-actions="actions">
                        <div class="flex gap-2">
                            <button 
                            class="border-2 border-red-300 p-1 rounded text-red-500 hover:bg-red-200" 
                            @click="onItemDelete(actions)">
                                <Icon 
                                name="fa-regular-trash-alt"
                                scale="0.8"
                                />
                            </button>
                            <button 
                            class="border-2 border-blue-300 p-1 rounded text-blue-500 hover:bg-blue-200"
                            @click="onItemUpdate(actions)">
                                <Icon 
                                name="fa-regular-edit"
                                scale="0.8"
                                />
                            </button>
                        </div>
                    </template>
                </DataTable>
            </div>

            
        </div>
        

    </div>
</template>