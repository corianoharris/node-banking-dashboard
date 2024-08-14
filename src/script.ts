document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const checkingAccount= document.getElementById('checkingAccount') as HTMLDivElement;
    const savingsAccount = document.getElementById('savingsAccount') as HTMLDivElement;
    const investmentAccount = document.getElementById('investmentAccount') as HTMLDivElement;
    const mortgageAccount = document.getElementById('mortgageAccount') as HTMLDivElement;
    const transactionsBody = document.getElementById('transactionsBody') as HTMLTableSectionElement;
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement;
    const sortFilter = document.getElementById('sortFilter') as HTMLSelectElement;
    const themeSwitcher = document.getElementById('themeSwitcher') as HTMLButtonElement;

    interface Transaction {
        date: string;
        type: string;
        description: string;
        balance: number;
    }

    let transactions: Transaction[] = [];

    // Function to fetch data from the API
    async function fetchData() {
        try {
            const [accountsResponse, transactionsResponse] = await Promise.all([
                fetch('/accounts'),
                fetch('/transactions')
            ]);

            const accounts = await accountsResponse.json();
            console.log(accounts);
            transactions = await transactionsResponse.json();

            displayAccountData(accounts);
            updateTransactionsTable(transactions);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to display account data
    function displayAccountData(accounts: any[]) {
        if (accounts.length > 0) {
            const account = accounts[0];
            updateAccountContent(checkingAccount, 'Checking Account', account.checking);
            updateAccountContent(savingsAccount, 'Savings Account', account.savings);
            updateAccountContent(investmentAccount, '401(k) Investment', account.investments);
            updateAccountContent(mortgageAccount, 'Mortgage', account.mortgage);
        } else {
            [checkingAccount, savingsAccount, investmentAccount, mortgageAccount].forEach(account => {
                if (account) account.innerHTML = '<p>No data available.</p>';
            });
        }
    }

    // Function to update account content
    function updateAccountContent(element: HTMLDivElement | null, title: string, data: any) {
        if (element) {
            element.innerHTML = `
                <h3>${title}</h3>
                ${Object.entries(data).map(([key, value]) => `<p>${key}: <span>${value}</span></p>`).join('')}
            `;
        }
    }

    // Function to update the transactions table
    function updateTransactionsTable(transactions: Transaction[]) {
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
            filteredTransactions = filteredTransactions.filter(t =>
                t.description.toLowerCase().includes(searchTerm) ||
                t.type.toLowerCase().includes(searchTerm)
            );
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
            } else if (sortCriteria === 'balance') {
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