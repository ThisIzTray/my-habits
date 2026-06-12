import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [needsPasswordReset, setNeedsPasswordReset] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setNeedsPasswordReset(true)
        setUser(session?.user ?? null)
      } else {
        setUser(session?.user ?? null)
        if (event === 'SIGNED_IN') setNeedsPasswordReset(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    // identities vide = compte déjà existant (Supabase masque l'erreur pour éviter l'énumération)
    if (data.user?.identities?.length === 0) {
      throw new Error('Un compte existe déjà avec cet email.')
    }
  }

  async function sendPasswordReset(email) {
    const redirectTo = import.meta.env.VITE_APP_URL || window.location.origin
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) throw error
  }

  async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    setNeedsPasswordReset(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { user, loading, needsPasswordReset, signIn, signUp, sendPasswordReset, updatePassword, signOut }
}
