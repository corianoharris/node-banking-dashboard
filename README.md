# Bank Dashboard

## Overview

The Bank Dashboard is a web application designed to provide a user-friendly interface for managing and viewing bank accounts and recent transactions. It includes features for filtering and sorting transactions, as well as switching between light and dark themes.

## Features

- **Dashboard Overview**: Provides a summary view of different types of bank accounts.
- **Account Details**: Displays detailed information for each account type, including Checking, Savings, Investment, and Mortgage.
- **Recent Transactions**: Lists recent transactions with options to filter and sort.
- **Theme Toggle**: Allows users to switch between light and dark themes for better accessibility and user experience.

## Structure

- **Header**: Contains the title of the dashboard and a button to switch between light and dark themes.
- **Accounts Section**: Displays different bank accounts with their respective details.
- **Transactions Section**: Shows recent transactions with search and filter options.
- **Filters**: Allows users to search and filter transactions based on type and sorting criteria.

## Accessibility

- **ARIA Roles and Properties**: The application includes ARIA roles and properties to improve accessibility:
  - `role="banner"` for the header.
  - `aria-label` attributes for buttons and input fields.
  - `aria-labelledby` attributes to link sections and their headings.
  - `aria-describedby` for tables to provide descriptive captions.

## Usage

1. **Switch Theme**: Click the "Switch Theme" button in the header to toggle between light and dark themes.
2. **View Accounts**: Navigate to the Accounts section to view details about Checking, Savings, Investment, and Mortgage accounts.
3. **Manage Transactions**:
   - Use the search input field to search for specific transactions.
   - Filter transactions by type using the dropdown menu.
   - Sort transactions by date or balance using the corresponding dropdown menu.

## Installation

To use this dashboard locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/bank-dashboard.git
