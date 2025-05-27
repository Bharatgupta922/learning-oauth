import SignOutButton from '@/components/SignOutButton'
import { getUser } from '@/lib/lucia'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {
    const user = await getUser()
    if (!user) {
        redirect('/authenticate')
    }
  return (
    <div className='relative flex w-full h-screen bg-background bg-class dark pb-2'>
        <div className=' max-w-3x1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
    <div className='pb-20 text-primary-foreground text-2xl'>You are logged in AS <span className='bold text-6xl'>{user?.name}</span> with EmailId <span className='bold text-6xl'>{user.email}</span> </div>
    <SignOutButton>Log Out!</SignOutButton>
        </div>
    </div>
  )
}

export default DashboardPage