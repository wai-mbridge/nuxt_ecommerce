import type { Profile } from '~/types/database.types'

export const useAuth = () => {
    const supabase = useSupabaseClient<Database>()
    const user = useSupabaseUser()

    // Sign up with email, password, and name
    const signUp = async (email: string, password: string, name: string, phone: string, address: string) => {
        const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
                phone: phone,
                address: address
            }
        }
        })

        if (error) throw error
        return data
    }

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error
        return data
    }

    // Sign out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    }

    // Get user profile
    const getProfile = async (): Promise<Profile | null> => {
        if (!user.value) return null

        const user_id = user.value.sub
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user_id)
            .single()
        if (error) throw error
        return data
    }

    // Update profile (excluding email as it's managed by auth)
    const updateProfile = async (updates: Partial<Omit<Profile, 'id' | 'email' | 'created_at'>>) => {
        if (!user.value) throw new Error('No user logged in')

        const user_id = user.value.sub
        const { data, error } = await supabase
            .from('profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
            .eq('id', user_id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    const isAuthenticated = computed(() => !!user.value)

    return {
        user: readonly(user),
        isAuthenticated,
        signUp,
        signIn,
        signOut,
        getProfile,
        updateProfile
    }
}
