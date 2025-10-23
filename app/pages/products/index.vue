<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <!-- Categories Navigation -->
        <div class="bg-white/60 backdrop-blur-sm border-b border-rose-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
              <!-- Categories Navigation -->
              <div class="flex space-x-4 overflow-x-auto py-4">
                <button
                  @click="selectCategory('all')"
                  :class="[
                    'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border shadow-sm',
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-600 border-rose-200 hover:border-rose-300 hover:text-rose-600'
                  ]"
                >
                  All Products
                </button>
                <button
                  v-for="category in categories"
                  :key="category.id"
                  @click="selectCategory(category.slug)"
                  :class="[
                    'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border shadow-sm',
                    selectedCategory === category.slug
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white border-transparent shadow-lg'
                      : 'bg-white text-gray-600 border-rose-200 hover:border-rose-300 hover:text-rose-600'
                  ]"
                >
                  {{ category.name }}
                </button>
              </div>

              <!-- Cart on the right side -->
              <div class="flex-shrink-0">
                <NuxtLink to="/cart" class="relative">
                  <div class="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-200 hover:border-rose-300 transition duration-200">
                    <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-700">My Cart</span>
                    <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-semibold shadow-lg">
                      {{ cartCount }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Page Header -->
            <div class="text-center mb-8">
                <h2 class="text-4xl font-bold text-gray-900 font-serif mb-4">
                Discover Your Beauty
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our premium collection of cosmetics and skincare products, carefully crafted for your natural beauty journey.
                </p>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="n in 8" :key="n" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 animate-pulse overflow-hidden">
                    <div class="h-48 bg-gradient-to-r from-rose-100 to-pink-100"></div>
                    <div class="p-5 space-y-3">
                        <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded"></div>
                        <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-2/3"></div>
                        <div class="h-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded w-1/3"></div>
                        <div class="h-10 bg-gradient-to-r from-rose-100 to-pink-100 rounded"></div>
                    </div>
                </div>
            </div>

            <!-- Products Grid -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-for="product in products" :key="product.id" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 hover:shadow-lg hover:border-rose-200 transition-all duration-300 overflow-hidden group flex flex-col">
                    <!-- Product Image -->
                    <NuxtLink :to="`/products/${product.slug}`" class="block relative overflow-hidden">
                        <div class="aspect-w-1 aspect-h-1 bg-gradient-to-r from-rose-50 to-pink-50">
                            <img
                                :src="product.images?.[0]?.image_url || '/images/products/default.jpg'"
                                :alt="product.name"
                                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <!-- Featured Badge -->
                        <div v-if="product.featured" class="absolute top-3 left-3">
                            <span class="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                                Featured
                            </span>
                        </div>
                    </NuxtLink>

                    <!-- Product Info -->
                    <div class="p-5 flex-1 flex flex-col">
                        <!-- Category -->
                        <div class="mb-2">
                            <span class="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
                                {{ product.category?.name }}
                            </span>
                        </div>

                        <!-- Product Name -->
                        <NuxtLink :to="`/products/${product.slug}`" class="block mb-2">
                            <h3 class="text-lg font-semibold text-gray-900 hover:text-rose-600 transition duration-200 line-clamp-2">
                                {{ product.name }}
                            </h3>
                        </NuxtLink>

                        <!-- Description -->
                        <p class="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                            {{ product.description }}
                        </p>

                        <!-- Price and Stock -->
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                                ${{ product.price }}
                            </span>
                            <span :class="[
                                'text-xs font-semibold px-2 py-1 rounded-full',
                                product.stock > 10 ? 'bg-green-100 text-green-700' :
                                product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            ]">
                                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                            </span>
                        </div>

                        <!-- Add to Cart Button -->
                        <button
                            @click="handleAddToCart(product)"
                            :disabled="product.stock === 0 || addingToCart === product.id"
                            :class="[
                                'w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 mt-auto',
                                product.stock === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : addingToCart === product.id
                                ? 'bg-rose-400 text-white cursor-wait'
                                : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
                            ]"
                        >
                            <svg v-if="addingToCart === product.id" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <svg v-else-if="product.stock === 0" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                            </svg>
                            <span>
                                {{ product.stock === 0 ? 'Out of Stock' :
                                addingToCart === product.id ? 'Adding...' : 'Add to Cart' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && products.length === 0" class="text-center py-16">
                <div class="max-w-md mx-auto">
                <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p class="text-gray-600 mb-6">Try selecting a different category or check back later for new arrivals.</p>
                <button
                    @click="selectCategory('all')"
                    class="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg"
                >
                    View All Products
                </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { getCategories, getProducts, getProductsByCategory, addToCart, getCartItems } = useEcommerce()

// State
const categories = ref([])
const products = ref([])
const selectedCategory = ref('all')
const loading = ref(true)
const addingToCart = ref('')
const cartCount = ref(0)

// Load initial data
onMounted(async () => {
  await loadCategories()
  await loadProducts()
  await loadCartCount()
})

// Load categories
const loadCategories = async () => {
  try {
    categories.value = await getCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

// Load products
const loadProducts = async () => {
    loading.value = true
    try {
        if (selectedCategory.value === 'all') {
        products.value = await getProducts()
        } else {
        const result = await getProductsByCategory(selectedCategory.value)
        products.value = result.products
        }
    } catch (error) {
        console.error('Error loading products:', error)
    } finally {
        loading.value = false
    }
}

// Load cart count
const loadCartCount = async () => {
    try {
        const cartItems = await getCartItems()
        cartCount.value = cartItems.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
        console.error('Error loading cart count:', error)
    }
}

// Category selection
const selectCategory = (categorySlug: string) => {
    selectedCategory.value = categorySlug
    loadProducts()
}

// Add to cart
const handleAddToCart = async (product: any) => {
    if (product.stock === 0) return

    addingToCart.value = product.id
    try {
        await addToCart(product.id, 1)
        await loadCartCount()

        // Show success message (you can add a toast notification here)
        console.log('Product added to cart!')
    } catch (error) {
        console.error('Error adding to cart:', error)
    } finally {
        addingToCart.value = ''
    }
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
