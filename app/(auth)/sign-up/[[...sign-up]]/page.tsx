import { SignUp } from '@clerk/nextjs'
import React from 'react'
import { createUser } from '@/lib/actions/user.actions'

const page = () => {
  return (
    <div>
      <button></button>
      <SignUp></SignUp>
    </div>
  )
}

export default page
