<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg divide-y divide-gray-200">
        <!-- Header -->
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Profile Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Manage your personal information and contact details.
          </p>
        </div>

        <!-- Profile Form -->
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="handleUpdateProfile">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  v-model="profileForm.name"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
              </div>

              <div class="sm:col-span-2">
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  :value="profileForm.email"
                  type="email"
                  disabled
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                >
                <p class="mt-1 text-xs text-gray-500">
                  Email cannot be changed from profile settings.
                </p>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="profileForm.phone"
                  type="tel"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="+1 (555) 123-4567"
                >
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  v-model="profileForm.address"
                  rows="3"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full address"
                ></textarea>
              </div>
            </div>

            <!-- Messages -->
            <div v-if="message" class="mt-4 p-3 rounded-md" :class="messageType === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'">
              {{ message }}
            </div>

            <!-- Actions -->
            <div class="mt-6 flex justify-between items-center">
              <button
                type="submit"
                :disabled="updating"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {{ updating ? 'Updating...' : 'Update Profile' }}
              </button>

              <button
                type="button"
                @click="handleSignOut"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
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
onMounted(async () => {
  try {
    const profile = await getProfile()
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
