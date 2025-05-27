import React from 'react'
import TabSwitcher from '@/components/TabSwitcher'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'

const Authenticate = async () => {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className='relative flex w-full h-screen bg-background bg-class dark'>
        <div className="max-w-3x1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TabSwitcher SignUpTab={<SignUpForm />} SignIntab={<SignInForm />} />
        </div>
    </div>
  )
}

export default Authenticate