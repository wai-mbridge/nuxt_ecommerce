import type { Database } from '~/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']
type Product = Database['public']['Tables']['products']['Row']
type ProductImage = Database['public']['Tables']['product_images']['Row']
type CartItem = Database['public']['Tables']['cart_items']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type OrderItem = Database['public']['Tables']['order_items']['Row']

export const useEcommerce = () => {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    // Get all categories
    const getCategories = async (): Promise<Category[]> => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')

        if (error) throw error
        return data || []
    }

    // Get products with filters
    const getProducts = async (options?: {
        category?: string
        featured?: boolean
        limit?: number
        }): Promise<Product[]> => {
            let query = supabase
                .from('products')
                .select(`
                    *,
                    category:categories(*),
                    images:product_images(*)
                `)

            if (options?.category) {
                query = query.eq('category_id', options.category)
            }

        if (options?.featured) {
            query = query.eq('featured', true)
        }

        if (options?.limit) {
            query = query.limit(options.limit)
        }

        query = query.order('created_at', { ascending: false })

        const { data, error } = await query

        if (error) throw error
        return data || []
    }

    // Get single product by slug
    const getProductBySlug = async (slug: string): Promise<Product | null> => {
        const { data, error } = await supabase
            .from('products')
            .select(`
                *,
                category:categories(*),
                images:product_images(*)
            `)
            .eq('slug', slug)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null
            throw error
        }

        return data
    }

    // Get products by category
    const getProductsByCategory = async (categorySlug: string): Promise<{ category: Category | null, products: Product[] }> => {
        // First get the category
        const { data: category, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', categorySlug)
            .single()

        if (categoryError && categoryError.code !== 'PGRST116') {
            throw categoryError
        }

        // Then get products for this category
        let products: Product[] = []
        if (category) {
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select(`
                    *,
                    category:categories(*),
                    images:product_images(*)
                `)
                .eq('category_id', category.id)
                .order('created_at', { ascending: false })

            if (productsError) throw productsError
            products = productsData || []
        }

        return { category, products }
    }

    // Cart functionality
    const getCartItems = async (): Promise<(CartItem & { product: Product })[]> => {
        if (!user.value) return []

        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                    *,
                    product:products(*,
                    images:product_images(*)
                    )
            `)
            .eq('user_id', user.value.sub)

        if (error) throw error
        return data || []
    }

    const addToCart = async (productId: string, quantity: number = 1) => {
        if (!user.value) throw new Error('User must be logged in to add to cart')

        const { data, error } = await supabase
            .from('cart_items')
            .upsert({
                user_id: user.value.sub,
                product_id: productId,
                quantity,
                updated_at: new Date().toISOString()
            })
            .select()
            .single()

        if (error) throw error
        return data
    }

    const updateCartItem = async (cartItemId: string, quantity: number) => {
        if (!user.value) throw new Error('User must be logged in')

        if (quantity <= 0) {
            return await removeFromCart(cartItemId)
        }

        const { data, error } = await supabase
            .from('cart_items')
            .update({
                quantity,
                updated_at: new Date().toISOString()
            })
            .eq('id', cartItemId)
            .eq('user_id', user.value.sub)
            .select()
            .single()

        if (error) throw error
        return data
    }

    const removeFromCart = async (cartItemId: string) => {
        if (!user.value) throw new Error('User must be logged in')

        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', cartItemId)
            .eq('user_id', user.value.sub)

        if (error) throw error
    }

    const clearCart = async () => {
        if (!user.value) throw new Error('User must be logged in')

        const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.value.sub)

        if (error) throw error
    }

    const checkout = async (checkoutData: {
        shippingAddress: {
            full_name: string
            address_line_1: string
            address_line_2?: string
            city: string
            state: string
            postal_code: string
            country: string
            phone?: string
        }
        billingAddress?: {
            full_name: string
            address_line_1: string
            address_line_2?: string
            city: string
            state: string
            postal_code: string
            country: string
        }
        paymentMethod: string
    }) => {
        if (!user.value) {
            throw new Error('User must be logged in to checkout')
        }

        // Start a transaction
        try {
            // 1. Get current cart items with product details
            const { data: cartItems, error: cartError } = await supabase
                .from('cart_items')
                .select(`
                    *,
                    product:products(*)
                `)
                .eq('user_id', user.value.sub)

            if (cartError) throw cartError

            if (!cartItems || cartItems.length === 0) {
                throw new Error('Cart is empty')
            }

            // 2. Validate stock and calculate total
            let totalAmount = 0
            const orderItems: Array<{
                product_id: string
                quantity: number
                unit_price: number
                total_price: number
            }> = []

            for (const item of cartItems) {
                if (item.quantity > item.product.stock) {
                throw new Error(`Not enough stock for ${item.product.name}. Available: ${item.product.stock}, Requested: ${item.quantity}`)
                }

                const itemTotal = item.product.price * item.quantity
                totalAmount += itemTotal

                orderItems.push({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.product.price,
                    total_price: itemTotal
                })
            }

            // Add shipping cost
            const shippingCost = totalAmount > 50 ? 0 : 5.99
            totalAmount += shippingCost

            // 3. Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

            // 4. Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.value.sub,
                    order_number: orderNumber,
                    status: 'pending',
                    total_amount: totalAmount,
                    shipping_address: checkoutData.shippingAddress,
                    billing_address: checkoutData.billingAddress || checkoutData.shippingAddress,
                    payment_status: 'pending'
                })
                .select()
                .single()

            if (orderError) throw orderError

            // 5. Create order items
            const orderItemsWithOrderId = orderItems.map(item => ({
                ...item,
                order_id: order.id
            }))

            const { error: orderItemsError } = await supabase
                .from('order_items')
                .insert(orderItemsWithOrderId)

            if (orderItemsError) throw orderItemsError

            // 6. Update product stock
            for (const item of cartItems) {
                const { data: currentProduct, error: fetchError } = await supabase
                    .from('products')
                    .select('stock')
                    .eq('id', item.product_id)
                    .single()

                if (fetchError) throw fetchError

                const current_stock = currentProduct.stock - item.quantity

                console.log(`before stock: ${currentProduct.stock}, checkout qty: ${item.quantity}, New stock = ${current_stock}`)
                const { data, error: updateStockError } = await supabase
                    .from('products')
                    .update({
                        stock: current_stock,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', item.product_id)
console.log('Updated product stock data:', data)
                if (updateStockError) throw updateStockError
            }

            // 7. Clear cart
            const { error: clearCartError } = await supabase
                .from('cart_items')
                .delete()
                .eq('user_id', user.value.sub)

            if (clearCartError) throw clearCartError

            // 8. Process payment (simulated)
            const paymentSuccess = await processPayment(order.id, totalAmount, checkoutData.paymentMethod)

            if (paymentSuccess) {
                // Update order status to confirmed
                const { error: updateOrderError } = await supabase
                    .from('orders')
                    .update({
                        status: 'confirmed',
                        payment_status: 'paid',
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', order.id)

                if (updateOrderError) throw updateOrderError
            } else {
                throw new Error('Payment failed. Please try again.')
            }

            return {
                order,
                orderItems: orderItemsWithOrderId,
                paymentStatus: paymentSuccess ? 'paid' : 'failed'
            }

        } catch (error) {
            console.error('Checkout error:', error)
            throw error
        }
    }

    const processPayment = async (orderId: string, amount: number, paymentMethod: string): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // demo purpose: 90% chance of success
                const success = Math.random() > 0.1
                console.log(`Payment ${success ? 'successful' : 'failed'} for order ${orderId}`)
                resolve(success)
            }, 2000)
        })
    }

    const getOrders = async (): Promise<(Order & { order_items: (OrderItem & { product: Product })[] })[]> => {
        if (!user.value) return []

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items(
                    *,
                    product:products(
                        *,
                        images:product_images(*)
                    )
                )
            `)
            .eq('user_id', user.value.sub)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data || []
    }

    // Get order by ID
    const getOrder = async (orderId: string): Promise<(Order & { order_items: (OrderItem & { product: Product })[] }) | null> => {
        if (!user.value) return null

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items(
                *,
                product:products(
                    *,
                    images:product_images(*)
                )
                )
            `)
            .eq('id', orderId)
            .eq('user_id', user.value.sub)
            .single()

        if (error) {
            if (error.code === 'PGRST116') return null
            throw error
        }

        return data
    }


    return {
        // Products
        getCategories,
        getProducts,
        getProductBySlug,
        getProductsByCategory,

        // Cart
        getCartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,

         // Checkout and orders
        checkout,
        getOrders,
        getOrder,
        processPayment
    }
}
