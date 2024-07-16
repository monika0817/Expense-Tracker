"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image'
function Hero() {
  const {user,isSignedIn}=useUser();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-6xl">
        Manage Your Expense
        <strong className="font-extrabold text-primary sm:block"> Control your Money</strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save ton of money
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
      {isSignedIn ? (
        <>
          
          <Link href="/dashboard">
          <Button>Get started</Button>
          </Link>
          
        </>
      ) : (
        <>
          
          <Link href="/sign-in">
            <Button>Get started</Button>
          </Link>
        </>
      )}

        
      </div>
    </div>
  </div>
  <Image src={'/dashboard.png'} alt ='dashboard'
  width={1000}
  height={700}
  className='-mt-9 rounded-xl border-2 '
  />
</section>
  )
}

export default Hero