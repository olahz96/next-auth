import { signOut } from 'next-auth/react'
import React from 'react'

const Home = () => {
  return <button onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/sign-in` })}>Sign out</button>
}

export default Home
