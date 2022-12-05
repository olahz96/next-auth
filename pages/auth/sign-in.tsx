import { NextPage } from 'next'
import React, { SyntheticEvent, useCallback } from 'react'
import { getCsrfToken, signIn } from 'next-auth/react'

interface SignInProps {
  csrfToken: string
}

const SignIn: NextPage<SignInProps> = ({ csrfToken }) => {
  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value
    const password = target.password.value

    await signIn('credentials', {
      username,
      password,
      callbackUrl: `${window.location.origin}/`
    })
  }, [])

  return (
    <div className="container vh-100">
      <div className="row h-100 d-flex justify-content-center align-items-center">
        <div className="col-12 col-lg-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <div className="mb-3">
                  <label htmlFor="username" className="form-label text-black">
                    Username
                  </label>
                  <input id="username" type="text" className="form-control" name="username" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-black">
                    Password
                  </label>
                  <input id="password" type="password" className="form-control" name="password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default SignIn
