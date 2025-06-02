'use client'

import React from 'react'
import { Button } from './ui/button'
import { RiGoogleFill } from '@remixicon/react'
import { getGoogleOAuthConsentUrl } from '@/app/authenticate/auth.action'
import { toast } from 'sonner'


const GoogleOAuthButton = () => {
  return (
    <Button onClick={async () => {
        const response = await getGoogleOAuthConsentUrl()
        
        if (response?.url) {
            window.location.href = response.url
        } else {
            toast.error('Failed to get Google OAuth URL')
        }
        console.log('Google OAuth Button Clicked')
    }}
    ><RiGoogleFill className='w-4 h-4 m-2' /> Continue with Google</Button>
  )
}

export default GoogleOAuthButton