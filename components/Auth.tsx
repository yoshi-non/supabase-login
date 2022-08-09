import React, { useState, VFC } from 'react'
import { supabase } from '../util/client'

export const Auth: VFC = () => {
  const [isLoding, setIsLoding] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setIsLoding(true)
      // 既存のユーザーにログインするか、サードパーティのプロバイダーを介してログインします。
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setIsLoding(false)
    }
  }

  return (
    <div className="text-xl">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Supabase + Next.js</h1>
        <p>
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="bg-gray-200 rounded p-2"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
            disabled={isLoding}
          >
            <span>{isLoding ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}