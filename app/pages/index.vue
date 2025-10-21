<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl font-bold text-gray-900 mb-6">
        Welcome to Our App
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Join thousands of users managing their profiles with ease.
      </p>
      <div class="space-x-4">
        <NuxtLink
          to="/login"
          class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/signup"
          class="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border border-indigo-600 hover:bg-indigo-50 transition duration-200"
        >
          Sign Up
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false
})
</script>
