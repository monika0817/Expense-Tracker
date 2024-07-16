import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema  from './schema'

const sql = neon('postgresql://expense-tracker_owner:ncTuEHl6FD1k@ep-aged-sunset-a5xslzc4.us-east-2.aws.neon.tech/expense-tracker?sslmode=require');
export const db = drizzle(sql, {schema});
