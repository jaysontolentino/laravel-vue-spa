<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/auth'

const { user } = storeToRefs(useAuthStore())
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-12">
        <h1 class="text-slate-50 text-6xl text-center tracking-tight">Welcome, {{ user.username }}</h1>

    </div>
</template>