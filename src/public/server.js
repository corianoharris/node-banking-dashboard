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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Accounts_1 = __importDefault(require("./models/Accounts"));
const Transaction_1 = __importDefault(require("../src/models/Transaction"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Serve static files from the 'src/public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Root route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// Get all accounts
app.get('/accounts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Inside the account fetch");
        const accounts = yield Accounts_1.default.find();
        res.json(accounts);
    }
    catch (error) {
        console.error('Error fetching accounts:', error);
        res.status(500).send('Error fetching accounts');
    }
}));
// Get all transactions
app.get('/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Inside the transactions fetch");
        const transactions = yield Transaction_1.default.find().sort({ date: -1 });
        res.json(transactions);
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
}));
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
mongoose_1.default.connect(uri || '')
    .then(() => {
    console.log('Successfully connected to MongoDB');
    // checks if an empty string
    if (!uri) {
        console.log("empty");
    }
})
    .then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});
