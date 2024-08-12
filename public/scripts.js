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
    const checkingCard = document.getElementById('checkingCard');
    const savingsCard = document.getElementById('savingsCard');
    const investmentCard = document.getElementById('investmentCard');
    const mortgageCard = document.getElementById('mortgageCard');
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
                const [cardsResponse, transactionsResponse] = yield Promise.all([
                    fetch('/api/cards'),
                    fetch('/api/transactions')
                ]);
                const cards = yield cardsResponse.json();
                transactions = yield transactionsResponse.json();
                displayCardData(cards);
                updateTransactionsTable(transactions);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    // Function to display card data
    function displayCardData(cards) {
        if (cards.length > 0) {
            const card = cards[0];
            updateCardContent(checkingCard, 'Checking Account', card.checking);
            updateCardContent(savingsCard, 'Savings Account', card.savings);
            updateCardContent(investmentCard, '401(k) Investment', card.investments);
            updateCardContent(mortgageCard, 'Mortgage', card.mortgage);
        }
        else {
            [checkingCard, savingsCard, investmentCard, mortgageCard].forEach(card => {
                if (card)
                    card.innerHTML = '<p>No data available.</p>';
            });
        }
    }
    // Function to update card content
    function updateCardContent(element, title, data) {
        if (element) {
            element.innerHTML = `
                <h3>${title}</h3>
                ${Object.entries(data).map(([key, value]) => `<p>${key}: ${value}</p>`).join('')}
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
