<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 py-12">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Profile Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100 overflow-hidden">
            <!-- Card Header -->
            <div class="px-6 py-5 border-b border-rose-200 bg-gradient-to-r from-rose-50 to-pink-50">
            <h3 class="text-xl font-semibold text-gray-900 font-serif">
                Profile Information
            </h3>
            <p class="mt-1 text-sm text-gray-600">
                Update your personal details and contact information
            </p>
            </div>

            <!-- Profile Form -->
            <div class="px-6 py-6 sm:p-8">
            <form @submit.prevent="handleUpdateProfile">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <!-- Name Field -->
                <div class="sm:col-span-2">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                    </label>
                    <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <input
                        id="name"
                        v-model="profileForm.name"
                        type="text"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                        placeholder="Enter your full name"
                    >
                    </div>
                </div>

                <!-- Email Field -->
                <div class="sm:col-span-2">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                    </label>
                    <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                        </svg>
                    </div>
                    <input
                        id="email"
                        :value="profileForm.email"
                        type="email"
                        disabled
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                        placeholder="your@email.com"
                    >
                    </div>
                    <p class="mt-2 text-xs text-gray-500 flex items-center">
                    <svg class="w-4 h-4 mr-1 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                    Email cannot be changed from profile settings
                    </p>
                </div>

                <!-- Phone Field -->
                <div class="sm:col-span-2">
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                    </label>
                    <div class="mt-1 relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                    </div>
                    <input
                        id="phone"
                        v-model="profileForm.phone"
                        type="tel"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                        placeholder="+1 (555) 123-4567"
                    >
                    </div>
                </div>

                <!-- Address Field -->
                <div class="sm:col-span-2">
                    <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                    Address
                    </label>
                    <div class="mt-1 relative">
                    <div class="absolute top-3 left-3 flex items-start pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                    </div>
                    <textarea
                        id="address"
                        v-model="profileForm.address"
                        rows="3"
                        class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200 resize-none"
                        placeholder="Enter your full address"
                    ></textarea>
                    </div>
                </div>
                </div>

                <!-- Messages -->
                <div v-if="message" class="mt-6 p-4 rounded-xl border" :class="messageType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="messageType === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <div class="text-sm font-medium">{{ message }}</div>
                </div>
                </div>

                <!-- Actions -->
                <div class="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                    type="submit"
                    :disabled="updating"
                    class="w-full sm:w-auto flex justify-center items-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 min-w-[140px]"
                >
                    <svg v-if="updating" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {{ updating ? 'Updating...' : 'Update Profile' }}
                </button>

                <button
                    type="button"
                    @click="handleSignOut"
                    class="w-full sm:w-auto flex justify-center items-center py-3 px-6 border border-rose-300 rounded-xl shadow-md text-sm font-medium text-rose-600 bg-white hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition duration-200 min-w-[140px]"
                >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    Sign Out
                </button>
                </div>
            </form>
            </div>
        </div>

        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    auth: true
})

const { user, signOut, getProfile, updateProfile } = useAuth()
const router = useRouter()

const profileForm = reactive({
    name: '',
    email: '',
    phone: '',
    address: ''
})

const updating = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Load profile data
watchEffect(async () => {
    try {
        const profile = await getProfile()
        console.log(profile);
        if (profile) {
            profileForm.name = profile.name || ''
            profileForm.email = profile.email || user.value?.email || ''
            profileForm.phone = profile.phone || ''
            profileForm.address = profile.address || ''
        }
    } catch (error) {
        console.error('Error loading profile:', error)
        message.value = 'Error loading profile data'
        messageType.value = 'error'
    }
})

const handleUpdateProfile = async () => {
  updating.value = true
  message.value = ''

  try {
    await updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      address: profileForm.address
    })
    message.value = 'Profile updated successfully!'
    messageType.value = 'success'
  } catch (error: any) {
    message.value = error.message
    messageType.value = 'error'
  } finally {
    updating.value = false
  }
}

const handleSignOut = async () => {
  try {
    await signOut()
    await router.push('/')
  } catch (error) {
    console.error('Error signing out:', error)
    message.value = 'Error signing out'
    messageType.value = 'error'
  }
}
</script>
