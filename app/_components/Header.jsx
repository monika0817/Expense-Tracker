"use client"
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Header() {

  const {user,isSignedIn}=useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./logo.svg'}
        alt='logo'
        width={60}
        height={60}
        />
        
       
       
        <div className="flex gap-4 justify-end">
      {isSignedIn ? (
        <>
          
          <Link href="/dashboard">
            <Button className="bg-slate-200 text-black">Dashboard</Button>
          </Link>
          <UserButton />
        </>
      ) : (
        <>
          <Link href="/sign-in">
            <Button className="bg-slate-200 text-black">Dashboard</Button>
          </Link>
          <Link href="/sign-in">
            <Button>Get started</Button>
          </Link>
        </>
      )}
    </div>
      </div>
   
  )
}

export default Header