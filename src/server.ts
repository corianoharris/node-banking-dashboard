import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Account from './models/Accounts';
import Transaction from '../src/models/Transaction';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'src/public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req: Request, res: Response) =>
{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all accounts
app.get('/accounts', async (req: Request, res: Response) =>
{
    try
    {
        console.log("Inside the account fetch");
        const accounts = await Account.find();
        res.json(accounts);
    } catch (error)
    {
        console.error('Error fetching accounts:', error);
        res.status(500).send('Error fetching accounts');
    }
});

// Get all transactions
app.get('/transactions', async (req: Request, res: Response) =>
{
    try
    {
        console.log("Inside the transactions fetch");
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error)
    {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
});


// async function seedData()
// {
//     // Sample account data
//     const accountData = {
//         checking: { category: 'Personal', balance: 5000, account: '1234567890' },
//         savings: { category: 'Personal', balance: 10000, account: '0987654321' },
//         investments: { category: '401(k)', type: 'Retirement', account: '1357924680', balance: 50000 },
//         mortgage: { category: 'Home Loan', term: 30, type: 'Residential', original: 300000, account: '2468013579', balance: 250000 }
//     };

//     // Sample transaction data
//     const transactionData = [
//         { date: new Date(), description: 'Paycheck Deposit', balance: 5000, type: 'Checking', paymentType: 'Deposit' },
//         { date: new Date(), description: 'Grocery Shopping', balance: 4800, type: 'Checking', paymentType: 'Withdrawal' },
//         { date: new Date(), description: 'Savings Transfer', balance: 10000, type: 'Savings', paymentType: 'Deposit' },
//         { date: new Date(), description: 'Mortgage Payment', balance: 249000, type: 'Mortgage', paymentType: 'Payment' }
//     ];

//     try
//     {
//         await Account.deleteMany({});
//         await Transaction.deleteMany({});

//         await Account.create(accountData);
//         await Transaction.insertMany(transactionData);

//         console.log('Data seeded successfully');
//     } catch (error)
//     {
//         console.error('Error seeding data:', error);
//     }
// }

// // Call this function after your MongoDB connection is established
// mongoose.connect(process.env.MONGO_URI || '')
//     .then(() => {
//         console.log('Connected to MongoDB');
//         return seedData();
//     })
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server running at http://localhost:${port}`);
//         });
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// MongoDB connection URI
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri || '')
    .then(() =>
    {
        console.log('Successfully connected to MongoDB');

        // checks if an empty string
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