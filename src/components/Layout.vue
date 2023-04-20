<script setup>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './../views/layouts/DefaultLayout.vue'

const route = useRoute()
const layout = shallowRef(DefaultLayout)

watch(
    () => route.meta,
    async meta => {
        try {
            const component = await import(`./../views/layouts/${meta.layout}.vue`)
            layout.value = component?.default || DefaultLayout
        } catch (error) {
            layout.value = DefaultLayout
        }
    },
    {
        immediate: true
    }
)

</script>

<template>
    <component :is="layout">
        <slot />
    </component>
</template>