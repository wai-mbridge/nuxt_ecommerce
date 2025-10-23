<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 font-serif mb-4">Your Shopping Cart</h1>
        <p class="text-lg text-gray-600">Review your beauty selections</p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div v-for="n in 3" :key="n" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6 animate-pulse">
          <div class="flex space-x-6">
            <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl"></div>
            <div class="flex-1 space-y-3">
              <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-3/4"></div>
              <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-1/2"></div>
              <div class="h-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-1/4"></div>
            </div>
          </div>
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
          <p class="text-gray-600 mb-8">Discover our premium cosmetics collection and start your beauty journey.</p>
          <NuxtLink to="/products" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Start Shopping
          </NuxtLink>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-else class="space-y-8">
        <!-- Cart Items List -->
        <div class="space-y-6">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6 hover:shadow-lg hover:border-rose-200 transition-all duration-300"
          >
            <div class="flex items-center space-x-6">
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                  :src="item.product.images?.[0]?.image_url || '/images/products/default.jpg'"
                  :alt="item.product.name"
                  class="w-24 h-24 object-cover rounded-xl shadow-sm"
                />
              </div>

              <!-- Product Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-xl font-semibold text-gray-900 hover:text-rose-600 transition duration-200">
                      <NuxtLink :to="`/products/${item.product.slug}`">
                        {{ item.product.name }}
                      </NuxtLink>
                    </h3>
                    <p class="text-sm text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block mt-2">
                      {{ item.product.category?.name }}
                    </p>
                  </div>
                  <p class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                </div>

                <p class="text-gray-600 mt-2 line-clamp-2">
                  {{ item.product.description }}
                </p>

                <!-- Quantity Controls -->
                <div class="flex items-center justify-between mt-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-gray-600">Quantity:</span>
                    <div class="flex items-center space-x-2">
                      <button
                        @click="updateQuantity(item, item.quantity - 1)"
                        :disabled="updatingItem === item.id || item.quantity <= 1"
                        :class="[
                          'w-8 h-8 rounded-full border flex items-center justify-center transition duration-200',
                          updatingItem === item.id || item.quantity <= 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400'
                        ]"
                      >
                        <span>-</span>
                      </button>

                      <span class="w-12 text-center font-semibold text-gray-900">{{ item.quantity }}</span>

                      <button
                        @click="updateQuantity(item, item.quantity + 1)"
                        :disabled="updatingItem === item.id || item.quantity >= item.product.stock"
                        :class="[
                          'w-8 h-8 rounded-full border flex items-center justify-center transition duration-200',
                          updatingItem === item.id || item.quantity >= item.product.stock
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400'
                        ]"
                      >
                        <span>+</span>
                      </button>
                    </div>
                    <span class="text-sm text-gray-500">
                      ${{ item.product.price }} each
                    </span>
                  </div>

                  <!-- Remove Button -->
                  <button
                    @click="removeItem(item.id)"
                    :disabled="removingItem === item.id"
                    :class="[
                      'flex items-center space-x-2 px-4 py-2 rounded-xl transition duration-200',
                      removingItem === item.id
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-rose-600 hover:text-rose-700 hover:bg-rose-50'
                    ]"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    <span class="text-sm font-medium">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6 font-serif">Order Summary</h3>

          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b border-rose-100">
              <span class="text-gray-600">Subtotal ({{ cartItems.length }} items)</span>
              <span class="font-semibold text-gray-900">${{ subtotal }}</span>
            </div>

            <div class="flex justify-between items-center py-3 border-b border-rose-100">
              <span class="text-gray-600">Shipping</span>
              <span class="font-semibold text-green-600">{{ shipping === '0.00' ? 'FREE' : `$${shipping}` }}</span>
            </div>

            <div class="flex justify-between items-center py-4">
              <span class="text-xl font-semibold text-gray-900">Total</span>
              <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                ${{ total }}
              </span>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            @click="goToCheckout"
            :disabled="checkingOut"
            :class="[
              'w-full mt-6 py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3',
              checkingOut
                ? 'bg-rose-400 text-white cursor-wait'
                : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
            ]"
          >
            <svg v-if="checkingOut" class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="text-xl">
              {{ checkingOut ? 'Processing...' : 'Proceed to Checkout' }}
            </span>
          </button>

          <!-- Continue Shopping -->
          <div class="mt-4 text-center">
            <NuxtLink to="/products" class="inline-flex items-center text-rose-600 hover:text-rose-700 transition duration-200 font-medium">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Continue Shopping
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getCartItems, updateCartItem, removeFromCart } = useEcommerce()

// State
const cartItems = ref([])
const loading = ref(true)
const updatingItem = ref('')
const removingItem = ref('')
const checkingOut = ref(false)

// Computed
const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.product.price * item.quantity)
    }, 0).toFixed(2)
})

const shipping = computed(() => {
    return subtotal.value > 50 ? '0.00' : '5.99'
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
    } catch (error) {
        console.error('Error loading cart items:', error)
    } finally {
        loading.value = false
    }
}

const updateQuantity = async (item: any, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return

    updatingItem.value = item.id
    try {
        await updateCartItem(item.id, newQuantity)
        await loadCartItems()
    } catch (error) {
        console.error('Error updating quantity:', error)
    } finally {
        updatingItem.value = ''
    }
}

const removeItem = async (itemId: string) => {
    removingItem.value = itemId
    try {
        await removeFromCart(itemId)
        await loadCartItems()
    } catch (error) {
        console.error('Error removing item:', error)
    } finally {
        removingItem.value = ''
    }
}

    const goToCheckout = () => {
        navigateTo('/checkout')
    }
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
