<template>
    <div class="min-h-screen bg-rose-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b border-rose-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <!-- Logo and Brand -->
                    <div class="flex items-center space-x-3">
                        <div class="w-12 h-12 rounded-full overflow-hidden border-1 border-white shadow-lg">
                            <img
                            src="/cosmetics-logo.jpg"
                            alt="Cosmetics Brand Logo"
                            class="w-full h-full object-cover"
                            />
                        </div>
                        <NuxtLink to="/" class="text-xl font-bold text-rose-500 font-serif">
                            Cosmetics
                        </NuxtLink>
                    </div>

                    <!-- Navigation Links -->
                    <div class="flex items-center space-x-4">
                        <NuxtLink to="/products" class="text-gray-600 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                            Products
                        </NuxtLink>
                        <NuxtLink to="/orders" class="text-gray-600 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                            Orders
                        </NuxtLink>
                        <NuxtLink to="/" class="text-gray-600 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200">
                            About
                        </NuxtLink>

                        <template v-if="isAuthenticated">
                            <!-- User Menu for Authenticated Users -->
                            <div class="flex items-center space-x-4">
                                <NuxtLink to="/profile" class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg inline-flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    My Profile
                                </NuxtLink>
                                <button @click="handleSignOut" class="bg-white text-rose-600 px-4 py-2 rounded-full text-sm font-medium border border-rose-300 hover:bg-rose-50 transition duration-200 shadow-md inline-flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </template>

                        <template v-else>
                            <!-- Login/Signup for Unauthenticated Users -->
                            <div class="flex items-center space-x-3">
                                <NuxtLink to="/login" class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg inline-flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    Sign In
                                </NuxtLink>
                                <NuxtLink to="/signup" class="bg-white text-rose-600 px-4 py-2 rounded-full text-sm font-medium border border-rose-300 hover:bg-rose-50 transition duration-200 shadow-md inline-flex items-center">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
                                    </svg>
                                    Sign Up
                                </NuxtLink>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Main Content -->
        <main>
        <slot />
        </main>

    </div>
</template>

<script setup lang="ts">
const { isAuthenticated, signOut } = useAuth()
const router = useRouter()

const handleSignOut = async () => {
    try {
        await signOut()
        await router.push('/')
    } catch (error) {
        console.error('Error signing out:', error)
    }
}
</script>
