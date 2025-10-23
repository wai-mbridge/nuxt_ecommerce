<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="max-w-md w-full text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Completing authentication...</p>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false
})

const { $supabase } = useNuxtApp()
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  // This page handles the OAuth callback
  // Supabase automatically processes the callback
  setTimeout(() => {
    router.push('/profile')
  }, 2000)
})
</script>
