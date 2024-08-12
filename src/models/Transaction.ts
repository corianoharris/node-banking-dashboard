import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Transaction document
interface ITransaction extends Document {
    date: Date;
    description?: string;
    balance: number;
    type: 'Checking' | 'Savings' | 'Investments' | 'Mortgage';
    paymentType: 'Deposit' | 'Withdrawal' | 'Payment';
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
    balance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Checking', 'Savings', 'Investments', 'Mortgage'],
        required: true
    },
    paymentType: {
        type: String,
        enum: ['Deposit' , 'Withdrawal' , 'Payment'],
        required: true
    },
});

// Create and export the model
const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
