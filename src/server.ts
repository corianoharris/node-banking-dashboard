// Import required modules and types
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Account from './models/Accounts'; // Import the Account model
import Transaction from '../src/models/Transaction'; // Import the Transaction model
import path from 'path';

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of an Express application
const app = express();
// Define the port to use, defaulting to 3000 if not specified in environment variables
const port = process.env.PORT || 3000;

// Serve static files from the 'src/public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route: Serve the main HTML file
app.get('/', (req: Request, res: Response) =>
{
    // Send 'index.html' file as response
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get all accounts
app.get('/accounts', async (req: Request, res: Response) =>
{
    try
    {
        // Fetch all accounts from the database
        const accounts = await Account.find();
        // Send the accounts as JSON response
        res.json(accounts);
    } catch (error)
    {
        // Log the error and send a 500 response if there's an issue
        console.error('Error fetching accounts:', error);
        res.status(500).send('Error fetching accounts');
    }
});

// Route to get all transactions
app.get('/transactions', async (req: Request, res: Response) =>
{
    try
    {
        // Fetch all transactions from the database, sorted by date in descending order
        const transactions = await Transaction.find().sort({ date: -1 });
        // Send the transactions as JSON response
        res.json(transactions);
    } catch (error)
    {
        // Log the error and send a 500 response if there's an issue
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
});

// Function to seed sample data into the database
async function seedData()
{
    // Sample account data
    const accountData = {
        checking: { balance: 5000, account: '1234567890' },
        savings: { balance: 10000, account: '0987654321' },
        investments: { type: 'Retirement', account: '1357924680', balance: 50000 },
        mortgage: { term: 30, type: 'Residential', original: 300000, account: '2468013579', balance: 250000 }
    };

    // Sample transaction data
    const transactionData = [
        { date: new Date().toISOString(), account: 'Checking', description: 'Paycheck Deposit', amount: 5000, type: 'Deposit' },
        { date: new Date().toISOString(), account: 'Checking', description: 'Grocery Shopping', amount: 4800, type: 'Withdrawal' },
        { date: new Date().toISOString(), account: 'Savings', description: 'Savings Transfer', amount: 1000, type: 'Deposit' },
        { date: new Date().toISOString(), account: 'Mortgage', description: 'Mortgage Payment', amount: 249000, type: 'Payment' }
    ];

    try
    {
        // Clear existing data from the collections
        await Account.deleteMany({});
        await Transaction.deleteMany({});

        // Insert sample data into the collections
        await Account.create(accountData);
        await Transaction.insertMany(transactionData);

        console.log('Data seeded successfully');
    } catch (error)
    {
        // Log the error if seeding fails
        console.error('Error seeding data:', error);
    }
}

// Connect to MongoDB using the connection URI from environment variables
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        console.log('Connected to MongoDB');
        // Seed data once the connection is established
        return seedData();
    })
    .then(() => {
        // Start the Express server once data is seeded
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        // Log any errors that occur during connection or seeding
        console.error('Error:', error);
    });

// The following commented-out section is an older version of MongoDB connection handling
// and has been replaced by the current implementation above
/*
const uri = process.env.MONGO_URI;

mongoose.connect(uri || '')
    .then(() =>
    {
        console.log('Successfully connected to MongoDB');

        if (!uri)
        {
            console.log("empty");
        }
    })
    .then(() =>
    {
        app.listen(port, () =>
        {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) =>
    {
        console.error('Error connecting to MongoDB:', error.message);
    });

mongoose.connection.on('connected', () =>
{
    console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) =>
{
    console.error('Mongoose connection error:', err);
});
*/
