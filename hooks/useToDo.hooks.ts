import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

export const useToDo = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
}