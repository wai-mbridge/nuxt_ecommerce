export interface Profile {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    address: string | null
    first_login: boolean | null
    created_at: string
    updated_at: string
}
export interface Category {
    id: string
    name: string
    slug: string
    description: string | null
    image_url: string | null
    created_at: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description: string | null
    price: number
    usage: string | null
    stock: number
    category_id: string | null
    featured: boolean
    created_at: string
    updated_at: string
    category?: Category
    images?: ProductImage[]
}

export interface ProductImage {
    id: string
    product_id: string
    image_url: string
    alt_text: string | null
    sort_order: number
    created_at: string
}

export interface CartItem {
    id: string
    user_id: string
    product_id: string
    quantity: number
    created_at: string
    updated_at: string
    product?: Product
}
export interface Order {
    id: string
    user_id: string
    order_number: string
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
    total_amount: number
    shipping_address: any // JSONB
    billing_address?: any // JSONB
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    created_at: string
    updated_at: string
    order_items?: OrderItem[]
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    quantity: number
    unit_price: number
    total_price: number
    created_at: string
    product?: Product
}


export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile
                Insert: Omit<Profile, 'created_at' | 'updated_at'>
                Update: Partial<Omit<Profile, 'id' | 'created_at'>>
            }
            categories: {
                Row: Category
                Insert: Omit<Category, 'id' | 'created_at'>
                Update: Partial<Omit<Category, 'id' | 'created_at'>>
            }
              products: {
                Row: Product
                Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
            }
              product_images: {
                Row: ProductImage
                Insert: Omit<ProductImage, 'id' | 'created_at'>
                Update: Partial<Omit<ProductImage, 'id' | 'created_at'>>
            }
              cart_items: {
                Row: CartItem
                Insert: Omit<CartItem, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<CartItem, 'id' | 'created_at' | 'updated_at'>>
            }
            orders: {
                Row: Order
                Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>
            }
            order_items: {
                Row: OrderItem
                Insert: Omit<OrderItem, 'id' | 'created_at'>
                Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>
            }
        }
    }
}
