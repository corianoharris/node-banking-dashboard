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
const Cards_1 = __importDefault(require("../src/models/Cards"));
const Transaction_1 = __importDefault(require("../src/models/Transaction"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Root route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
// Get all cards
app.get('/api/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield Cards_1.default.find();
        res.json(cards);
    }
    catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).send('Error fetching cards');
    }
}));
// Get all transactions
app.get('/api/transactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction_1.default.find().sort({ date: -1 });
        res.json(transactions);
    }
    catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send('Error fetching transactions');
    }
}));
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGO_URI || '')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
    .catch(error => {
    console.error('Error connecting to MongoDB:', error);
});
