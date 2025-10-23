<template>
  <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 font-serif mb-4">My Orders</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your beauty purchases and order history
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div v-for="n in 3" :key="n" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-8 animate-pulse">
          <div class="flex justify-between items-start mb-6">
            <div class="space-y-3">
              <div class="h-5 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-40"></div>
              <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-32"></div>
            </div>
            <div class="h-7 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-24"></div>
          </div>
          <div class="space-y-3">
            <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-full"></div>
            <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-3/4"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p class="text-gray-600 mb-8">Your beauty journey starts here. Explore our premium cosmetics collection.</p>
          <NuxtLink to="/products" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            Start Shopping
          </NuxtLink>
        </div>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-8">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300"
        >
          <div class="p-8">
            <!-- Order Header -->
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
              <div class="mb-4 lg:mb-0">
                <h3 class="text-2xl font-semibold text-gray-900 font-serif">
                  Order #{{ order.order_number }}
                </h3>
                <div class="flex items-center space-x-2 mt-3">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-sm text-gray-600">
                    Placed on {{ formatDate(order.created_at) }}
                  </p>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <span :class="statusClass(order.status)" class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  {{ formatStatus(order.status) }}
                </span>
                <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                  ${{ order.total_amount }}
                </span>
              </div>
            </div>

            <!-- Order Items Preview -->
            <div class="border-t border-rose-100 pt-6">
              <div class="flex items-center space-x-4 overflow-x-auto pb-4">
                <div
                  v-for="item in order.order_items.slice(0, 4)"
                  :key="item.id"
                  class="flex-shrink-0 relative group"
                >
                  <img
                    :src="item.product.images?.[0]?.image_url || '/images/products/default.jpg'"
                    :alt="item.product.name"
                    class="w-20 h-20 object-cover rounded-xl border-2 border-rose-100 group-hover:border-rose-300 transition duration-200 shadow-sm"
                  />
                  <div class="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {{ item.quantity }}
                  </div>
                </div>
                <div v-if="order.order_items.length > 4" class="flex-shrink-0">
                  <div class="w-20 h-20 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border-2 border-rose-100 flex items-center justify-center">
                    <span class="text-sm text-rose-600 font-semibold">
                      +{{ order.order_items.length - 4 }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="mt-6 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                <div class="flex items-center space-x-4 text-sm text-gray-600">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                    <span>{{ order.order_items.length }} item{{ order.order_items.length > 1 ? 's' : '' }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                    <span>Payment: <span :class="paymentStatusClass(order.payment_status)" class="font-semibold">
                      {{ formatPaymentStatus(order.payment_status) }}
                    </span></span>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <NuxtLink
                    :to="`/orders/${order.id}`"
                    class="inline-flex items-center justify-center px-6 py-3 border border-rose-300 text-sm font-semibold rounded-xl text-rose-600 bg-white hover:bg-rose-50 transition duration-200 shadow-sm"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    View Details
                  </NuxtLink>

                  <button
                    v-if="order.status === 'delivered'"
                    class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="text-center">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            :class="[
              'inline-flex items-center px-8 py-4 border text-lg font-semibold rounded-xl transition duration-200',
              loadingMore
                ? 'border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed'
                : 'border-rose-300 text-rose-600 bg-white hover:bg-rose-50 hover:border-rose-400 shadow-sm'
            ]"
          >
            <svg v-if="loadingMore" class="animate-spin -ml-1 mr-3 h-5 w-5 text-rose-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loadingMore ? 'Loading...' : 'Load More Orders' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true
})

const { getOrders } = useEcommerce()

// State
const orders = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const hasMore = ref(false)

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
        pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
        confirmed: 'bg-blue-100 text-blue-700 border border-blue-200',
        shipped: 'bg-purple-100 text-purple-700 border border-purple-200',
        delivered: 'bg-green-100 text-green-700 border border-green-200',
        cancelled: 'bg-red-100 text-red-700 border border-red-200'
    }
    return classes[status] || 'bg-gray-100 text-gray-700 border border-gray-200'
}

const paymentStatusClass = (status: string) => {
    const classes = {
        pending: 'text-yellow-600',
        paid: 'text-green-600',
        failed: 'text-red-600',
        refunded: 'text-gray-600'
    }
    return classes[status] || 'text-gray-600'
}

// Load orders
onMounted(async () => {
    await loadOrders()
})

const loadOrders = async () => {
    loading.value = true
    try {
        const ordersData = await getOrders()
        orders.value = ordersData

        // You can implement pagination here
        // For now, we'll assume all orders are loaded
        hasMore.value = false

    } catch (error) {
        console.error('Error loading orders:', error)
    } finally {
        loading.value = false
    }
}

const loadMore = async () => {
    // Implement pagination if needed
    loadingMore.value = true
    try {
        // Load more orders logic here
    } catch (error) {
        console.error('Error loading more orders:', error)
    } finally {
        loadingMore.value = false
    }
}
</script>
