<script setup>
import {computed} from 'vue'

const props = defineProps({
    type: String,
    size: String,
    disable: Boolean,
    isLoading: Boolean,
})

const classObj = computed(() => {
    return {
        'w-full bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-400': props.size === 'full',
        'bg-blue-500 text-white py-1 px-2 rounded font-medium hover:bg-blue-400': props.size === 'sm',
        'bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-400': props.size === 'md',
        'bg-blue-500 text-white py-3 px-6 rounded font-medium hover:bg-blue-400': props.size === 'lg',
    }
})

</script>

<template>
    <button :class="classObj">
        <Icon v-if="isLoading" name="fa-spinner" animation="spin-pulse" />
        <slot />
    </button>
</template>