<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="max-w-4xl mx-auto text-center px-4 mb-2">
            <!-- Cosmetics Icon -->
            <div class="flex justify-center mb-6">
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

            <h1 class="text-4xl font-bold text-gray-900 font-serif">
                Join Our Cosmetics Family
            </h1>
            <p class="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                Create your account and discover a world of beauty tailored just for you
            </p>
        </div>

        <!-- Signup Form -->
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-rose-100">
                <form class="space-y-6" @submit.prevent="handleSignup">
                    <!-- Name Field -->
                    <div>
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
                                v-model="form.name"
                                name="name"
                                type="text"
                                autocomplete="name"
                                required
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                                placeholder="Enter your full name"
                            >
                        </div>
                    </div>

                    <!-- Email Field -->
                    <div>
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
                                v-model="form.email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                                placeholder="your@email.com"
                            >
                        </div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div class="mt-1 relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                </svg>
                            </div>
                            <input
                                id="password"
                                v-model="form.password"
                                name="password"
                                type="password"
                                autocomplete="new-password"
                                required
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                                placeholder="Create a password"
                            >
                        </div>
                        <p class="mt-1 text-xs text-gray-500">
                            Use 8 or more characters with a mix of letters, numbers & symbols
                        </p>
                    </div>

                    <!-- Confirm Password Field -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div class="mt-1 relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                            </div>
                            <input
                                id="confirmPassword"
                                v-model="form.confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autocomplete="new-password"
                                required
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                                placeholder="Confirm your password"
                            >
                        </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="rounded-xl bg-red-50 p-4 border border-red-200">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <div class="text-sm text-red-700">{{ error }}</div>
                        </div>
                    </div>

                    <!-- Success Message -->
                    <div v-if="success" class="rounded-xl bg-green-50 p-4 border border-green-200">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <div class="text-sm text-green-700">{{ success }}</div>
                        </div>
                    </div>

                    <!-- Signup Button -->
                    <div>
                        <button
                            type="submit"
                            :disabled="loading"
                            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                        >
                            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {{ loading ? 'Creating Account...' : 'Create Your Account' }}
                        </button>
                    </div>

                    <!-- Login Link -->
                    <div class="text-center pt-4 border-t border-gray-200">
                        <p class="text-sm text-gray-600">
                            Already part of our beauty community?
                            <NuxtLink
                                to="/login"
                                class="font-medium text-rose-600 hover:text-rose-500 ml-1 transition duration-200"
                            >
                                Sign in to your account
                            </NuxtLink>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/profile'
    }
})

const { signUp } = useAuth()
const router = useRouter()

const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSignup = async () => {
    loading.value = true
    error.value = ''
    success.value = ''

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
        error.value = 'Passwords do not match'
        loading.value = false
        return
    }

    // Validate password length
    if (form.password.length < 8) {
        error.value = 'Password must be at least 8 characters long'
        loading.value = false
        return
    }

    try {
        await signUp(form.email, form.password, form.name)
        success.value = 'Account created successfully! Please check your email for verification. You will be redirected to login shortly.'

        // Clear form
        form.name = ''
        form.email = ''
        form.password = ''
        form.confirmPassword = ''

        // Redirect to login after success
        setTimeout(() => {
            router.push('/login')
        }, 4000)
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}
</script>
