<template>
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <!-- Header -->
        <div class="bg-white/80 backdrop-blur-sm border-b border-rose-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-6">
            <!-- Back Button -->
            <NuxtLink to="/products" class="flex items-center text-rose-600 hover:text-rose-500 transition duration-200 group">
                <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back to Products
            </NuxtLink>

            <!-- Cart -->
            <div class="flex items-center space-x-6">
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

        <!-- Loading State -->
        <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="animate-pulse">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Image Loading -->
            <div class="space-y-4">
                <div class="bg-gradient-to-r from-rose-100 to-pink-100 h-96 rounded-2xl"></div>
                <div class="grid grid-cols-4 gap-4">
                <div v-for="n in 4" :key="n" class="bg-gradient-to-r from-rose-100 to-pink-100 h-20 rounded-xl"></div>
                </div>
            </div>
            <!-- Content Loading -->
            <div class="space-y-6">
                <div class="h-8 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-3/4"></div>
                <div class="h-6 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-1/4"></div>
                <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-full"></div>
                <div class="h-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-2/3"></div>
                <div class="h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl w-1/2"></div>
            </div>
            </div>
        </div>
        </div>

        <!-- Product Detail -->
        <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Image Gallery -->
            <div class="space-y-6">
            <!-- Main Image -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
                <img
                :src="currentImage.image_url"
                :alt="currentImage.alt_text || product.name"
                class="w-full h-96 object-cover"
                />
            </div>

            <!-- Thumbnail Gallery -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-4">
                <button
                v-for="(image, index) in product.images"
                :key="image.id"
                @click="currentImageIndex = index"
                :class="[
                    'bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border-2 transition-all duration-200',
                    currentImageIndex === index
                    ? 'border-rose-500 shadow-lg scale-105'
                    : 'border-rose-100 hover:border-rose-300'
                ]"
                >
                <img
                    :src="image.image_url"
                    :alt="image.alt_text || product.name"
                    class="w-full h-20 object-cover"
                />
                </button>
            </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-8">
            <!-- Header -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6">
                <div class="flex items-start justify-between mb-4">
                    <div>
                        <span class="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                        {{ product.category?.name }}
                        </span>
                        <h1 class="text-4xl font-bold text-gray-900 font-serif mt-3">{{ product.name }}</h1>
                    </div>
                    <!-- Featured Badge -->
                    <div v-if="product.featured" class="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                        Featured
                    </div>
                </div>

                <!-- Price and Stock -->
                <div class="flex items-center justify-between">
                    <span class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                        ${{ product.price }}
                    </span>
                    <span :class="[
                        'text-sm font-semibold px-3 py-1 rounded-full',
                        product.stock > 10 ? 'bg-green-100 text-green-700' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    ]">
                        {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                    </span>
                </div>
            </div>

            <!-- Description -->
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Product Description
                </h3>
                <p class="text-gray-700 leading-relaxed text-lg">{{ product.description }}</p>
            </div>

            <!-- How to Use -->
            <div v-if="product.usage" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 text-rose-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                How to Use
                </h3>
                <p class="text-gray-700 leading-relaxed">{{ product.usage }}</p>
            </div>

            <!-- Add to Cart -->
            <div>
                <button
                @click="handleAddToCart"
                :disabled="product.stock === 0 || addingToCart"
                :class="[
                    'w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-3',
                    product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : addingToCart
                    ? 'bg-rose-400 text-white cursor-wait'
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
                ]"
                >
                <svg v-if="addingToCart" class="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else-if="product.stock === 0" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span class="text-xl">
                    {{ product.stock === 0 ? 'Out of Stock' :
                    addingToCart ? 'Adding to Cart...' : 'Add to Cart' }}
                </span>
                </button>

                <!-- Success Message -->
                <div v-if="showSuccess" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-green-700 font-medium">Product added to cart successfully!</span>
                </div>
            </div>
            </div>
        </div>
        </div>

        <!-- Not Found -->
        <div v-else class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 p-12">
            <div class="w-24 h-24 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-2">Product not found</h3>
            <p class="text-gray-600 mb-8">The product you're looking for doesn't exist or may have been removed.</p>
            <NuxtLink to="/products" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-700 transition duration-200 shadow-lg">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to Products
            </NuxtLink>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProductBySlug, addToCart, getCartItems } = useEcommerce()

// State
const product = ref(null)
const loading = ref(true)
const addingToCart = ref(false)
const currentImageIndex = ref(0)
const cartCount = ref(0)
const showSuccess = ref(false)

// Computed
const currentImage = computed(() => {
    if (!product.value || !product.value.images || product.value.images.length === 0) {
        return { image_url: '/images/products/default.jpg', alt_text: 'Product image' }
    }
    return product.value.images[currentImageIndex.value]
})

// Load product data
onMounted(async () => {
    await loadProduct()
    await loadCartCount()
})

const loadProduct = async () => {
    loading.value = true
    try {
        const productData = await getProductBySlug(route.params.slug as string)
        product.value = productData
    } catch (error) {
        console.error('Error loading product:', error)
    } finally {
        loading.value = false
    }
}

const loadCartCount = async () => {
    try {
        const cartItems = await getCartItems()
        cartCount.value = cartItems.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
        console.error('Error loading cart count:', error)
    }
}

const handleAddToCart = async () => {
    if (!product.value || product.value.stock === 0) return

    addingToCart.value = true
    showSuccess.value = false

    try {
        await addToCart(product.value.id, 1)
        await loadCartCount()

        // Show success message
        showSuccess.value = true
        setTimeout(() => {
        showSuccess.value = false
        }, 3000)

    } catch (error) {
        console.error('Error adding to cart:', error)
    } finally {
        addingToCart.value = false
    }
}
</script>
