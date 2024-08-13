var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    var checkingCard = document.getElementById('checkingCard');
    var savingsCard = document.getElementById('savingsCard');
    var investmentCard = document.getElementById('investmentCard');
    var mortgageCard = document.getElementById('mortgageCard');
    var transactionsBody = document.getElementById('transactionsBody');
    var searchInput = document.getElementById('searchInput');
    var typeFilter = document.getElementById('typeFilter');
    var sortFilter = document.getElementById('sortFilter');
    var themeSwitcher = document.getElementById('themeSwitcher');
    var transactions = [];
    // Function to fetch data from the API
    function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, cardsResponse, transactionsResponse, cards, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, Promise.all([
                                fetch('/api/cards'),
                                fetch('/api/transactions')
                            ])];
                    case 1:
                        _a = _b.sent(), cardsResponse = _a[0], transactionsResponse = _a[1];
                        return [4 /*yield*/, cardsResponse.json()];
                    case 2:
                        cards = _b.sent();
                        return [4 /*yield*/, transactionsResponse.json()];
                    case 3:
                        transactions = _b.sent();
                        displayCardData(cards);
                        updateTransactionsTable(transactions);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.error('Error fetching data:', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    // Function to display card data
    function displayCardData(cards) {
        if (cards.length > 0) {
            var card = cards[0];
            updateCardContent(checkingCard, 'Checking Account', card.checking);
            updateCardContent(savingsCard, 'Savings Account', card.savings);
            updateCardContent(investmentCard, '401(k) Investment', card.investments);
            updateCardContent(mortgageCard, 'Mortgage', card.mortgage);
        }
        else {
            [checkingCard, savingsCard, investmentCard, mortgageCard].forEach(function (card) {
                if (card)
                    card.innerHTML = '<p>No data available.</p>';
            });
        }
    }
    // Function to update card content
    function updateCardContent(element, title, data) {
        if (element) {
            element.innerHTML = "\n                <h3>".concat(title, "</h3>\n                ").concat(Object.entries(data).map(function (_a) {
                var key = _a[0], value = _a[1];
                return "<p>".concat(key, ": ").concat(value, "</p>");
            }).join(''), "\n            ");
        }
    }
    // Function to update the transactions table
    function updateTransactionsTable(transactions) {
        if (transactionsBody) {
            transactionsBody.innerHTML = transactions.map(function (transaction) { return "\n                <tr>\n                    <td>".concat(new Date(transaction.date).toLocaleDateString(), "</td>\n                    <td>").concat(transaction.type, "</td>\n                    <td>").concat(transaction.description, "</td>\n                    <td>").concat(transaction.balance.toFixed(2), "</td>\n                </tr>\n            "); }).join('');
        }
    }
    // Function to filter and sort transactions
    function filterAndSortTransactions() {
        var filteredTransactions = __spreadArray([], transactions, true);
        // Apply search filter
        var searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredTransactions = filteredTransactions.filter(function (t) {
                return t.description.toLowerCase().includes(searchTerm) ||
                    t.type.toLowerCase().includes(searchTerm);
            });
        }
        // Apply type filter
        var typeValue = typeFilter.value;
        if (typeValue) {
            filteredTransactions = filteredTransactions.filter(function (t) { return t.type.toLowerCase() === typeValue; });
        }
        // Apply sorting
        var sortCriteria = sortFilter.value;
        filteredTransactions.sort(function (a, b) {
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
    themeSwitcher.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
    });
    // Fetch data on page load
    fetchData();
});
