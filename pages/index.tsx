import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { supabase } from '../util/client'
import { Auth } from '../components/Auth'
import { Account } from '../components/Account'
import { Session } from '@supabase/gotrue-js'

const Home: NextPage = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Returns the session data, if there is an active session.
    setSession(supabase.auth.session())

    // Receive a notification every time an auth event happens.
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="flex items-center justify-center" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user!.id} session={session} />
      )}
    </div>
  )
}

export default Home