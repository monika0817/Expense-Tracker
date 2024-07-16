import {pgTable, serial, varchar, integer, numeric} from "drizzle-orm/pg-core";

export const Budgets=pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    icon:varchar('icon'),
    CreatedBy:varchar('CreatedBy').notNull()
})

export const Expenses=pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    budgetId:integer('budgetid').references(()=>Budgets.id),
    CreatedAt:varchar('CreatedAt').notNull()
})