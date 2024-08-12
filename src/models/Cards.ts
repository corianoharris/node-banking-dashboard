import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Card document
interface ICard extends Document
{
    checking: {
        balance: number;
        account: number;
    };
    savings: {
        balance: number;
        account: number;
    };
    investments: {
        type: string;
        account: number;
        balance: number;
    };
    mortgage: {
        term: string;
        type: 'Residential' | 'Commercial';
        original: number;
        balance: number;
        account: number;
    };
}

// Define the schema for the Card model
const cardSchema: Schema = new Schema({
    checking: {
        balance: { type: Number, required: true },
        account: { type: String, required: true },
    },
    savings: {
        balance: { type: Number, required: true },
        account: { type: String, required: true },
    },
    investments: {
        type: { type: String, required: true },
        account: { type: String, required: true },
        balance: { type: Number, required: true },
    },
    mortgage: {
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
const Card = mongoose.model<ICard>('Card', cardSchema);

export default Card;
