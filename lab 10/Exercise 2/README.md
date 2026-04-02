# Lab 10 Exercise 2 - Dynamic React List

This project implements a React application that manages a list dynamically, showcasing list rendering and key management.

## Functional Requirements Fulfilled

- Uses a functional component (`App.jsx`) to manage the list.
- Employs the `useState` Hook to maintain an array of items.
- Dynamically renders the items utilizing the `map()` function.
- Assigns unique `key` attributes using `Date.now()` for new items.
- Allows users to add items via a controlled text input.
- Enables removal of items through an `onClick` event handler.
- Updates natively through React re-renders upon state changes.
- Shows a pleasant conditional empty state when no items exist.
- Separates styling correctly and ensures efficient DOM reconciliation.

## Running the Project

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173` to view the application.
