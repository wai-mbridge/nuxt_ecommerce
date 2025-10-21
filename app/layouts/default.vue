<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900">
              MyApp
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <NuxtLink
                to="/profile"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </NuxtLink>
              <button
                @click="handleSignOut"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/login"
                class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </NuxtLink>
              <NuxtLink
                to="/signup"
                class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </nav>

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
