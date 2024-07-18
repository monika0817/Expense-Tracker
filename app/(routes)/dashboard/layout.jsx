"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/utils/dbConfig'
import { Budgets } from "@/utils/schema"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { ResponsiveContainer } from 'recharts'

function DashboardLayout({children}) {

  const {user}=useUser();
  const router=useRouter();
  useEffect(()=>{
    user&&checkUserBudgets();
  },[user])

  const checkUserBudgets=async()=>{
    const result=await db.select()
      .from(Budgets)
      .where(eq(Budgets.CreatedBy,user?.primaryEmailAddress?.emailAddress))

      console.log(result);
      if(result?.length==0)
        {
          router.replace('/dashboard/budgets')
        }

  }
   
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
        <ResponsiveContainer width={'100%'} height={300}>
            <SideNav/>
        </ResponsiveContainer>    
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
            {children}
        </div>
        </div>
  )
}

export default DashboardLayout