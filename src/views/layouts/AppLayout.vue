<script setup>
import Navbar from './../../components/Navbar.vue'
</script>

<template>

    <Navbar />
    
    <div class="w-screen min-h-screen h-full bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-8">
        
        <section class="container mx-auto mt-48">

            <slot />
            
        </section>
    </div>
</template>