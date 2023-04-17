<script setup>
import {computed} from 'vue'

const props = defineProps({
    type: String,

})

const classObj = computed(() => {
    return {
        'text-center bg-red-50 text-red-500 border border-red-500 py-4 px-6 rounded-md my-2': props.type === 'error',
        'text-center bg-green-50 text-green-500 border border-green-500  py-4 px-6 rounded-md my-2': props.type === 'success',
    }
})
</script>

<template>
    <div :class="classObj">
        <slot />
    </div>
</template>