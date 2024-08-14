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
// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const checkingAccount = document.getElementById('checkingAccount');
    const savingsAccount = document.getElementById('savingsAccount');
    const investmentAccount = document.getElementById('investmentAccount');
    const mortgageAccount = document.getElementById('mortgageAccount');
    const transactionsBody = document.getElementById('transactionsBody');
    const searchInput = document.getElementById('searchInput');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const themeSwitcher = document.getElementById('themeSwitcher');
    // Array to store transactions
    let transactions = [];
    // Function to fetch data from the API
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch account and transaction data concurrently
                const [accountsResponse, transactionsResponse] = yield Promise.all([
                    fetch('/accounts'),
                    fetch('/transactions')
                ]);
                // Parse the responses as JSON
                const accounts = yield accountsResponse.json();
                console.log(accounts); // Log accounts data for debugging
                transactions = yield transactionsResponse.json();
                // Display account data and update the transactions table
                displayAccountData(accounts);
                updateTransactionsTable(transactions);
            }
            catch (error) {
                // Log any errors encountered during data fetching
                console.error('Error fetching data:', error);
            }
        });
    }
    // Function to display account data in their respective sections
    function displayAccountData(accounts) {
        if (accounts.length > 0) {
            // Display data for each type of account
            const account = accounts[0];
            updateAccountContent(checkingAccount, 'Checking Account', account.checking);
            updateAccountContent(savingsAccount, 'Savings Account', account.savings);
            updateAccountContent(investmentAccount, '401(k) Investment', account.investments);
            updateAccountContent(mortgageAccount, 'Mortgage', account.mortgage);
        }
        else {
            // Display a no data message if no account data is available
            [checkingAccount, savingsAccount, investmentAccount, mortgageAccount].forEach(account => {
                if (account)
                    account.innerHTML = '<p>No data available.</p>';
            });
        }
    }
    // Function to update the content of an account section
    function updateAccountContent(element, title, data) {
        if (element) {
            // Generate HTML to display account data
            element.innerHTML = `
                <h3>${title}</h3>
                ${Object.entries(data).map(([key, value]) => `<p>${key}: <span>${value}</span></p>`).join('')}
            `;
        }
    }
    // Function to update the transactions table with the provided data
    function updateTransactionsTable(transactions) {
        if (transactionsBody) {
            // Generate table rows for each transaction
            transactionsBody.innerHTML = transactions.map(transaction => `
                <tr>
                    <td>${new Date(transaction.date).toLocaleDateString()}</td>
                    <td>${transaction.type}</td>
                    <td>${transaction.account}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.amount.toFixed(2)}</td>    
                </tr>
            `).join('');
        }
    }
    // Function to filter and sort transactions based on user input
    function filterAndSortTransactions() {
        let filteredTransactions = [...transactions];
        // Apply search filter based on user input
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredTransactions = filteredTransactions.filter(t => t.description.toLowerCase().includes(searchTerm) ||
                t.type.toLowerCase().includes(searchTerm));
        }
        // Apply type filter based on selected filter value
        const typeValue = typeFilter.value;
        if (typeValue) {
            filteredTransactions = filteredTransactions.filter(t => t.type.toLowerCase() === typeValue);
        }
        // Apply sorting based on selected criteria
        const sortCriteria = sortFilter.value;
        filteredTransactions.sort((a, b) => {
            if (sortCriteria === 'date') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            else if (sortCriteria === 'balance') {
                return b.amount - a.amount;
            }
            return 0;
        });
        // Update the transactions table with filtered and sorted data
        updateTransactionsTable(filteredTransactions);
    }
    // Add event listeners to input elements for filtering and sorting
    searchInput.addEventListener('input', filterAndSortTransactions);
    typeFilter.addEventListener('change', filterAndSortTransactions);
    sortFilter.addEventListener('change', filterAndSortTransactions);
    // Add event listener to theme switcher button
    themeSwitcher.addEventListener('click', () => {
        // Toggle between light and dark theme
        document.body.classList.toggle('dark-theme');
    });
    // Fetch data from the API when the page is loaded
    fetchData();
});
