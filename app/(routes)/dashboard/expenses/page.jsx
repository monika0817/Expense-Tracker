"use client"
import {  UserButton,useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'


import { Budgets, Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import ExpenseListTable from './[id]/_components/ExpenseListTable';
import CardInfo from '../_components/CardInfo';
import BarChartDashboard from '../_components/BarChartDashboard';


function expenses() {
  const {user}=useUser();

  const [budgetList,setBudgetlist]=useState([]);
  const [expensesList,setExpensesList]=useState([]);
  
  useEffect(()=>{
    user&&getBudgetList();
  },[user])
  /**
   * used to get budget List
   */

  const getBudgetList=async()=>{

  const result=await db.select({
    ...getTableColumns(Budgets),
    totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
    totalItem:sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.CreatedBy,user?.primaryEmailAddress.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    ;
    
    setBudgetlist(result);
    getAllExpenses();
   
  }

  /**
   * used to get all expenses belong to users
   */

  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      CreatedAt:Expenses.CreatedAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.CreatedBy,user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setExpensesList(result);

    
  }
  return (
    <div className='p-4'>
      
      
      

      
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
         
            <h2 className="font-bold text-lg mt-3">All expenses</h2>
            <ExpenseListTable
            expensesList={expensesList}
            refreshData={()=>getBudgetList()}
            />
        </div>
       
      </div>
    </div>
  )
}


export default expenses