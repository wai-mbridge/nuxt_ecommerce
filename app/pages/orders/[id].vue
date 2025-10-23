<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse">
        <div class="h-10 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl w-1/3 mb-6 mx-auto"></div>
        <div class="h-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-1/2 mb-12 mx-auto"></div>
        <div class="h-80 bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl"></div>
      </div>

      <!-- Order Confirmation -->
      <div v-else-if="order" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8">
        <!-- Success Header -->
        <div class="text-center mb-12">
          <div class="w-20 h-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-gray-900 font-serif mb-4">Order Confirmed!</h1>
          <p class="text-xl text-gray-600 mb-2">Thank you for choosing our premium cosmetics</p>
          <p class="text-lg text-rose-600 font-semibold">Order #{{ order.order_number }}</p>
        </div>

        <!-- Order Details Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- Order Information -->
          <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg class="w-5 h-5 text-rose-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Order Details
            </h2>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-rose-100">
                <span class="font-medium text-gray-700">Order Date:</span>
                <span class="text-gray-900">{{ formatDate(order.created_at) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-rose-100">
                <span class="font-medium text-gray-700">Status:</span>
                <span :class="statusClass(order.status)">{{ formatStatus(order.status) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-rose-100">
                <span class="font-medium text-gray-700">Payment:</span>
                <span :class="paymentStatusClass(order.payment_status)">{{ formatPaymentStatus(order.payment_status) }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="font-medium text-gray-700">Total Amount:</span>
                <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  ${{ order.total_amount }}
                </span>
              </div>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <h2 class="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg class="w-5 h-5 text-rose-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Shipping Address
            </h2>
            <div class="text-gray-700 space-y-2">
              <p class="font-semibold text-gray-900">{{ order.shipping_address.full_name }}</p>
              <p>{{ order.shipping_address.address_line_1 }}</p>
              <p v-if="order.shipping_address.address_line_2">{{ order.shipping_address.address_line_2 }}</p>
              <p>{{ order.shipping_address.city }}, {{ order.shipping_address.state }} {{ order.shipping_address.postal_code }}</p>
              <p>{{ order.shipping_address.country }}</p>
              <p v-if="order.shipping_address.phone" class="flex items-center mt-4">
                <svg class="w-4 h-4 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ order.shipping_address.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="border-t border-rose-100 pt-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-6 font-serif">Order Items</h2>
          <div class="space-y-4">
            <div
              v-for="item in order.order_items"
              :key="item.id"
              class="flex items-center space-x-6 bg-white rounded-2xl p-6 border border-rose-100 hover:shadow-md transition-all duration-200"
            >
              <img
                :src="item.product.images?.[0]?.image_url || '/images/products/default.jpg'"
                :alt="item.product.name"
                class="w-20 h-20 object-cover rounded-xl border-2 border-rose-100 shadow-sm"
              />
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 hover:text-rose-600 transition duration-200">
                  <NuxtLink :to="`/products/${item.product.slug}`">
                    {{ item.product.name }}
                  </NuxtLink>
                </h3>
                <p class="text-sm text-rose-600 bg-rose-50 px-3 py-1 rounded-full inline-block mt-2">
                  {{ item.product.category?.name }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                <p class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  ${{ item.total_price }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="border-t border-rose-100 pt-8 mt-8">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <NuxtLink to="/products" class="inline-flex items-center px-8 py-4 border border-rose-300 text-lg font-semibold rounded-xl text-rose-600 bg-white hover:bg-rose-50 transition duration-200 shadow-sm">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              Continue Shopping
            </NuxtLink>
            <NuxtLink to="/orders" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              View All Orders
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Order Not Found -->
      <div v-else class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">Order not found</h3>
          <p class="text-gray-600 mb-8">The order you're looking for doesn't exist or may have been removed.</p>
          <NuxtLink to="/orders" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            View Orders
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getOrder } = useEcommerce()

// State
const order = ref(null)
const loading = ref(true)

// Helper functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatStatus = (status: string) => {
  const statusMap = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }
  return statusMap[status] || status
}

const formatPaymentStatus = (status: string) => {
  const statusMap = {
    pending: 'Pending',
    paid: 'Paid',
    failed: 'Failed',
    refunded: 'Refunded'
  }
  return statusMap[status] || status
}

const statusClass = (status: string) => {
  const classes = {
    pending: 'text-yellow-700 bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-full text-sm font-semibold',
    confirmed: 'text-blue-700 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full text-sm font-semibold',
    shipped: 'text-purple-700 bg-purple-100 border border-purple-200 px-3 py-1 rounded-full text-sm font-semibold',
    delivered: 'text-green-700 bg-green-100 border border-green-200 px-3 py-1 rounded-full text-sm font-semibold',
    cancelled: 'text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-full text-sm font-semibold'
  }
  return classes[status] || 'text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm font-semibold'
}

const paymentStatusClass = (status: string) => {
  const classes = {
    pending: 'text-yellow-700 bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-full text-sm font-semibold',
    paid: 'text-green-700 bg-green-100 border border-green-200 px-3 py-1 rounded-full text-sm font-semibold',
    failed: 'text-red-700 bg-red-100 border border-red-200 px-3 py-1 rounded-full text-sm font-semibold',
    refunded: 'text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm font-semibold'
  }
  return classes[status] || 'text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm font-semibold'
}

// Load order
onMounted(async () => {
  await loadOrder()
})

const loadOrder = async () => {
  loading.value = true
  try {
    const orderData = await getOrder(route.params.id as string)
    order.value = orderData
  } catch (error) {
    console.error('Error loading order:', error)
  } finally {
    loading.value = false
  }
}
</script>
