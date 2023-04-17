<script setup>

defineProps({
    modelValue: String,
    type: String,
    placeholder: String
})

defineEmits(['update:modelValue'])
</script>

<template>
    <input
    :type="type" 
    :value="modelValue"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    class="py-2 px-3 border border-blue-500 outline-none focus:border-blue-500 focus:ring-blue-500 rounded-md" />
</template>