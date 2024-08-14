"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules and types
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Accounts_1 = __importDefault(require("./models/Accounts")); // Import the Account model
const Transaction_1 = __importDefault(require("../src/models/Transaction")); // Import the Transaction model
const path_1 = __importDefault(require("path"));
// Load environment variables from a .env file into process.env
dotenv_1.default.config();
// Create an instance of an Express application
const app = (0, express_1.default)();
// Define the port to use, defaulting to 3000 if not specified in environment variables
const port = process.env.PORT || 3000;
// Serve static files from the 'src/public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Root route: Serve the main HTML file
app.get('/', (req, res) => {
    // Send 'index.html' file as response
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// Route to get all accounts
app.get('/accounts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all accounts from the database
        const accounts = yield Accounts_1.default.find();
        // Send the accounts as JSON response
        res.json(accounts);
    }
    catch (error) {
        // Log the error and send a 500 response if there's an issue
        console.error('Error fetching accounts:', error);
        res.status(500).send('Error fetching accounts');
    }
}));
// Route to get all transactions
app.get('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all transactions from the database, sorted by date in descending order
        const transactions = yield Transaction_1.default.find().sort({ date: -1 });
        // Send the transactions as JSON response
        res.json(transactions);
    }
    catch (error) {
        // Log the error and send a 500 response if there's an issue
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
}));
// Function to seed sample data into the database
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
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
        try {
            // Clear existing data from the collections
            yield Accounts_1.default.deleteMany({});
            yield Transaction_1.default.deleteMany({});
            // Insert sample data into the collections
            yield Accounts_1.default.create(accountData);
            yield Transaction_1.default.insertMany(transactionData);
            console.log('Data seeded successfully');
        }
        catch (error) {
            // Log the error if seeding fails
            console.error('Error seeding data:', error);
        }
    });
}
// Connect to MongoDB using the connection URI from environment variables
mongoose_1.default.connect(process.env.MONGO_URI || '')
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
