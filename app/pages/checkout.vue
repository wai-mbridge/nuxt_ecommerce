<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 font-serif mb-4">Checkout</h1>
        <p class="text-lg text-gray-600">Complete your purchase with confidence</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="h-80 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl"></div>
            <div class="h-64 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl"></div>
          </div>
          <div class="h-96 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl"></div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="cartItems.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p class="text-gray-600 mb-8">Add some beauty products to your cart before checking out.</p>
          <NuxtLink to="/products" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Continue Shopping
          </NuxtLink>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Checkout Form -->
        <div class="space-y-6">
          <!-- Shipping Address -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg class="w-6 h-6 text-rose-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Shipping Address
            </h2>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="full_name" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  id="full_name"
                  v-model="checkoutForm.shippingAddress.full_name"
                  type="text"
                  required
                  class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                  placeholder="Enter your full name"
                >
              </div>
              <div>
                <label for="address_line_1" class="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                <input
                  id="address_line_1"
                  v-model="checkoutForm.shippingAddress.address_line_1"
                  type="text"
                  required
                  class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                  placeholder="Street address, P.O. box, company name"
                >
              </div>
              <div>
                <label for="address_line_2" class="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                <input
                  id="address_line_2"
                  v-model="checkoutForm.shippingAddress.address_line_2"
                  type="text"
                  class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                >
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    id="city"
                    v-model="checkoutForm.shippingAddress.city"
                    type="text"
                    required
                    class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                    placeholder="City"
                  >
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    id="state"
                    v-model="checkoutForm.shippingAddress.state"
                    type="text"
                    required
                    class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                    placeholder="State"
                  >
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="postal_code" class="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                  <input
                    id="postal_code"
                    v-model="checkoutForm.shippingAddress.postal_code"
                    type="text"
                    required
                    class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                    placeholder="ZIP / Postal code"
                  >
                </div>
                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <input
                    id="country"
                    v-model="checkoutForm.shippingAddress.country"
                    type="text"
                    required
                    class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                    placeholder="Country"
                  >
                </div>
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id="phone"
                  v-model="checkoutForm.shippingAddress.phone"
                  type="tel"
                  class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition duration-200"
                  placeholder="Phone number for delivery updates"
                >
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg class="w-6 h-6 text-rose-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Payment Method
            </h2>
            <div class="space-y-4">
              <div
                class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
                :class="checkoutForm.paymentMethod === 'credit_card'
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-300 hover:border-rose-300'"
                @click="checkoutForm.paymentMethod = 'credit_card'"
              >
                <input
                  id="credit-card"
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  value="credit_card"
                  class="focus:ring-rose-500 h-5 w-5 text-rose-600 border-gray-300"
                >
                <label for="credit-card" class="ml-4 block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  Credit Card
                </label>
              </div>
              <div
                class="flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200"
                :class="checkoutForm.paymentMethod === 'paypal'
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-300 hover:border-rose-300'"
                @click="checkoutForm.paymentMethod = 'paypal'"
              >
                <input
                  id="paypal"
                  v-model="checkoutForm.paymentMethod"
                  type="radio"
                  value="paypal"
                  class="focus:ring-rose-500 h-5 w-5 text-rose-600 border-gray-300"
                >
                <label for="paypal" class="ml-4 block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.5 14.25c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1 2.5-2.5 2.5zm9 0c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1 2.5-2.5 2.5z"/>
                  </svg>
                  PayPal
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8 h-fit">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 font-serif">Order Summary</h2>

          <!-- Order Items -->
          <div class="space-y-4 mb-6 max-h-80 overflow-y-auto">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center space-x-4 p-4 bg-white rounded-xl border border-rose-100"
            >
              <img
                :src="item.product.images?.[0]?.image_url || '/images/products/default.jpg'"
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded-lg border-2 border-rose-100"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-gray-900 truncate">{{ item.product.name }}</h3>
                <p class="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full inline-block mt-1">
                  {{ item.product.category?.name }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Qty: {{ item.quantity }}</p>
              </div>
              <p class="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
            </div>
          </div>

          <!-- Order Totals -->
          <div class="border-t border-rose-100 pt-6 space-y-3">
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold text-gray-900">${{ subtotal }}</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-600">Shipping</span>
              <span class="font-semibold text-green-600">{{ shipping === '0.00' ? 'FREE' : `$${shipping}` }}</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-rose-100">
              <span class="text-xl font-semibold text-gray-900">Total</span>
              <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                ${{ total }}
              </span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            @click="processCheckout"
            :disabled="processingCheckout"
            :class="[
              'w-full mt-8 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3',
              processingCheckout
                ? 'bg-rose-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
            ]"
          >
            <svg v-if="processingCheckout" class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-xl">
              {{ processingCheckout ? 'Processing...' : 'Complete Order' }}
            </span>
          </button>

          <!-- Security Badge -->
          <div class="mt-4 text-center">
            <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <span>Secure checkout • 256-bit SSL encryption</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true
})

const { getCartItems, checkout: checkoutApi } = useEcommerce()
const router = useRouter()

// State
const cartItems = ref([])
const loading = ref(true)
const processingCheckout = ref(false)
const error = ref('')

// Checkout form
const checkoutForm = reactive({
    shippingAddress: {
        full_name: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone: ''
    },
    paymentMethod: 'credit_card'
})

// Computed
const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
    }, 0).toFixed(2)
})

const shipping = computed(() => {
   return parseFloat(subtotal.value) > 50 ? '0.00' : '5.99'
})

const total = computed(() => {
   return (parseFloat(subtotal.value) + parseFloat(shipping.value)).toFixed(2)
})

// Load cart items
onMounted(async () => {
   await loadCartItems()
})

const loadCartItems = async () => {
  loading.value = true
  try {
    cartItems.value = await getCartItems()
  } catch (err) {
    console.error('Error loading cart items:', err)
    error.value = 'Failed to load cart items'
  } finally {
    loading.value = false
  }
}

const processCheckout = async () => {
    processingCheckout.value = true
    error.value = ''

    try {
        // Validate form
        if (!validateForm()) {
        return
        }

        const result = await checkoutApi(checkoutForm)

        // Redirect to order confirmation page
        await router.push(`/orders/${result.order.id}`)

  } catch (err: any) {
        console.error('Checkout error:', err)
        error.value = err.message || 'An error occurred during checkout. Please try again.'
  } finally {
        processingCheckout.value = false
  }
}

const validateForm = (): boolean => {
    const requiredFields = [
        'full_name',
        'address_line_1',
        'city',
        'state',
        'postal_code',
        'country'
    ]

    for (const field of requiredFields) {
        if (!checkoutForm.shippingAddress[field]?.trim()) {
        error.value = `Please fill in all required fields. Missing: ${field.replace('_', ' ')}`
        return false
        }
    }

    if (!checkoutForm.paymentMethod) {
        error.value = 'Please select a payment method'
        return false
    }

    return true
}
</script>
