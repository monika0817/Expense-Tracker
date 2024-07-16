// alter_amount_column.js

const { Client } = require('@neondatabase/serverless');

const client = new Client({
  connectionString: 'postgres://your_username:your_password@your_neon_host/your_database_name',
  ssl: true,
});

const alterColumnType = async () => {
  let retries = 3; // Number of retry attempts
  let delay = 5000; // Delay between retries in milliseconds

  while (retries > 0) {
    try {
      await client.connect();

      // Alter column type query
      const query = `
        ALTER TABLE budgets
        ALTER COLUMN amount TYPE numeric USING amount::numeric;

        ALTER TABLE expenses
        ALTER COLUMN amount TYPE numeric USING amount::numeric;
      `;

      await client.query(query);
      console.log('Column type altered successfully.');
      return; // Exit function on success

    } catch (err) {
      console.error('Error altering column type:', err);

      // Handle specific error types or retry on any error
      retries--;
      if (retries > 0) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    } finally {
      await client.end();
    }
  }

  console.error('Failed to alter column type after retries.');
};

alterColumnType();
