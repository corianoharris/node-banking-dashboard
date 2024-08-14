import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Card document
interface IAccounts extends Document
{
    checking: {
        category: string;
        balance: number;
        account: number;
    };
    savings: {
        category: string;
        balance: number;
        account: number;
    };
    investments: {
        category: string;
        type: string;
        account: number;
        balance: number;
    };
    mortgage: {
        category: string;
        term: string;
        type: 'Residential' | 'Commercial';
        original: number;
        balance: number;
        account: number;
    };
}

// Define the schema for the Card model
const accountSchema: Schema = new Schema({
    checking: { 
        category: { type: String, required: true },
        balance: { type: Number, required: true },
        account: { type: String, required: true },
    },
    savings: {
        category: { type: String, required: true },
        balance: { type: Number, required: true },
        account: { type: String, required: true },
    },
    investments: {
        category: { type: String, required: true },
        type: { type: String, required: true },
        account: { type: String, required: true },
        balance: { type: Number, required: true },
    },
    mortgage: {
        category: { type: String, required: true },
        term: { type: Number, required: true },
        type: {
            type: String,
            enum: ['Residential', 'Commercial'],
            required: true
        },
        original: { type: Number, required: true },
        account: { type: String, required: true },
        balance: { type: Number, required: true },
    }
});

// Create and export the model
const Account = mongoose.model<IAccounts>('Account', accountSchema);

export default Account;
