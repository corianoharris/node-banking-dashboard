"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Card model
const accountSchema = new mongoose_1.Schema({
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
const Account = mongoose_1.default.model('Account', accountSchema);
exports.default = Account;
