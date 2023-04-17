<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <div class="w-screen h-screen bg-slate-100">
    <div class="container mx-auto px-8 pt-28">
      <RouterView />
    </div>
  </div>
</template>
