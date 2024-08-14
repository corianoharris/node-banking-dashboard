import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Transaction document
interface ITransaction extends Document {
    date: Date;
    description?: string;
    balance: number;
    type: 'Deposit' | 'Withdrawal' | 'Payment'
    account: 'Checking' | 'Savings' | 'Investments' | 'Mortgage';
}

// Define the schema for the Transaction model
const transactionSchema: Schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Deposit' , 'Withdrawal' , 'Payment'], 
        required: true
    },
    account: {
        type: String,
        enum: ['Checking', 'Savings', 'Investments', 'Mortgage'],
        required: true
    },
});

// Create and export the model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
