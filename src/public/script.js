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
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const checkingAccount = document.getElementById('checkingAccount');
    const savingsAccount = document.getElementById('savingsAccount');
    const investmentAccount = document.getElementById('investmentAccount');
    const mortgageAccount = document.getElementById('mortgageAccount');
    const transactionsBody = document.getElementById('transactionsBody');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const themeSwitcher = document.getElementById('themeSwitcher');
    let transactions = [];
    // Function to fetch data from the API
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [accountsResponse, transactionsResponse] = yield Promise.all([
                    fetch('/accounts'),
                    fetch('/transactions')
                ]);
                const accounts = yield accountsResponse.json();
                console.log(accounts);
                transactions = yield transactionsResponse.json();
                displayAccountData(accounts);
                updateTransactionsTable(transactions);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    // Function to display account data
    function displayAccountData(accounts) {
        if (accounts.length > 0) {
            const account = accounts[0];
            updateAccountContent(checkingAccount, 'Checking Account', account.checking);
            updateAccountContent(savingsAccount, 'Savings Account', account.savings);
            updateAccountContent(investmentAccount, '401(k) Investment', account.investments);
            updateAccountContent(mortgageAccount, 'Mortgage', account.mortgage);
        }
        else {
            [checkingAccount, savingsAccount, investmentAccount, mortgageAccount].forEach(account => {
                if (account)
                    account.innerHTML = '<p>No data available.</p>';
            });
        }
    }
    // Function to update account content
    function updateAccountContent(element, title, data) {
        if (element) {
            element.innerHTML = `
                <h3>${title}</h3>
                ${Object.entries(data).map(([key, value]) => `<p>${key}: <span>${value}</span></p>`).join('')}
            `;
        }
    }
    // Function to update the transactions table
    function updateTransactionsTable(transactions) {
        if (transactionsBody) {
            transactionsBody.innerHTML = transactions.map(transaction => `
                <tr>
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                    <td>${transaction.type}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.balance.toFixed(2)}</td>
                </tr>
            `).join('');
        }
    }
    // Function to filter and sort transactions
    function filterAndSortTransactions() {
        let filteredTransactions = [...transactions];
        // Apply search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredTransactions = filteredTransactions.filter(t => t.description.toLowerCase().includes(searchTerm) ||
                t.type.toLowerCase().includes(searchTerm));
        }
        // Apply type filter
        const typeValue = typeFilter.value;
        if (typeValue) {
            filteredTransactions = filteredTransactions.filter(t => t.type.toLowerCase() === typeValue);
        }
        // Apply sorting
        const sortCriteria = sortFilter.value;
        filteredTransactions.sort((a, b) => {
            if (sortCriteria === 'date') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            else if (sortCriteria === 'balance') {
                return b.balance - a.balance;
            }
            return 0;
        });
        updateTransactionsTable(filteredTransactions);
    }
    // Event listeners
    searchInput.addEventListener('input', filterAndSortTransactions);
    typeFilter.addEventListener('change', filterAndSortTransactions);
    sortFilter.addEventListener('change', filterAndSortTransactions);
    // Theme switcher
    themeSwitcher.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
    // Fetch data on page load
    fetchData();
});
