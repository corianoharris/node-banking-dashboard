import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Card from '../src/models/Cards';
import Transaction from '../src/models/Transaction';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'src/public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all cards
app.get('/api/cards', async (req: Request, res: Response) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Error fetching cards');
    }
});

// Get all transactions
app.get('/api/transactions', async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });