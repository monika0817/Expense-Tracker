"use client";
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { desc } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import ExpenseListTable from './[id]/_components/ExpenseListTable'; // Adjust the path if necessary

const ExpenseListPage = () => {
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const result = await db.select().from(Expenses).orderBy(desc(Expenses.id));
            setExpensesList(result);
        };

        fetchExpenses();
    }, []);

    return (
        <div className="p-10">
            <h2 className="text-2xl font-bold">All Expenses</h2>
            <div className="mt-4">
                <ExpenseListTable expensesList={expensesList} />
            </div>
        </div>
    );
};

export default ExpenseListPage;
