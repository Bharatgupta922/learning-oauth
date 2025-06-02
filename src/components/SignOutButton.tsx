'use client'

import { logout } from '@/app/authenticate/auth.action'
import React from 'react'
import { Button } from './ui/button'

type Props = {
    children: React.ReactNode
}

const SignOutButton = ({ children }: Props) => {

  return (
    <Button onClick={() => logout()}>{children}</Button>
  )
}

export default SignOutButton