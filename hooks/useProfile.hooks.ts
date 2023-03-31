import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { UserAccount } from './types/user'

export const useProfile = (session: { session: Session | null }) => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [account, setAccount] = useState<UserAccount>({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (session) {
      setLoading(true)
      getProfile().then(() =>
        setLoading(false))
    }
  }, [session])
  const signOut = () => {
    supabase.auth.signOut().then(() => console.log('signed out'))
  }
  const login = async (email: string, password: string) => {
    
  }
  const getProfile = async () => {
    try {
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data && user) {
        const currentUser: UserAccount = {
          email: user.email,
          username: data?.username,
          website: data?.website,
          avatarURL: data?.avatar_url,
        }
        setAccount(currentUser)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    }
  }

  const updateProfile = async ({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return { account, getProfile, updateProfile, loading, signOut }
}