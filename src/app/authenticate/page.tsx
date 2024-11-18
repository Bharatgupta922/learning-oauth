import React from 'react'
import TabSwitcher from '@/components/TabSwitcher'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const Authenticate = () => {
  return (
    <div className='relative flex w-full h-screen bg-background'>
        <div className="max-w-3x1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <TabSwitcher SignUpTab={<SignUpForm />} SignIntab={<SignInForm />} />
        </div>
    </div>
  )
}

export default Authenticate