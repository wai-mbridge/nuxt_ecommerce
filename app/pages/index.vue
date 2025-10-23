<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center">
        <div class="max-w-4xl mx-auto text-center px-4">
            <!-- Cosmetics Icon -->
            <div class="flex justify-center mb-8">
                <div class="relative">
                    <div class="w-24 h-24 rounded-full overflow-hidden border-1 border-white shadow-lg">
                        <img
                            src="/cosmetics-logo.jpg"
                            alt="Cosmetics Brand Logo"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <!-- Main Heading -->
            <h1 class="text-5xl font-bold text-gray-900 mb-6 font-serif">
                Welcome to Our Cosmetics Shop
            </h1>

            <!-- Subheading -->
            <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Discover your natural beauty with our premium collection of organic cosmetics, skincare, and beauty products crafted for the modern you.
            </p>

            <!-- CTA Buttons -->
            <div class="space-x-4 space-y-4 sm:space-y-0">
                <NuxtLink to="/login" class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg inline-flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    Sign In to Your Account
                </NuxtLink>
                <NuxtLink to="/signup" class="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold border border-rose-300 hover:bg-rose-50 transition duration-200 shadow-md inline-flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                    </svg>
                    Create New Account
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
