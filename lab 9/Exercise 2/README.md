# Lab 9 - Exercise 2: Student Cards React Application

This project is a React application developed for **Lab 9 - Exercise 2**. It focuses on demonstrating **component reusability** and **data passing via props** in a balanced, subtle UI layout.

## 🚀 Features

- **Reusable Component**: A central `StudentCard` component used for multiple instances.
- **Props-based Rendering**: Dynamically passes name, department, and marks from a parent to child component.
- **Subtle Modern UI**: Implements a clean design with glassmorphism, soft gradients, and a responsive grid layout.
- **Responsive Design**: The application adjusts its layout for mobile and desktop views using a CSS grid.

## 📁 Component Structure

- **`App.jsx`**: The parent component that defines an array of student data and maps over it to render the cards.
- **`StudentCard.jsx`**: A reusable functional child component that accepts props and displays them in a card format.
- **`StudentCard.css`**: Contains the card-specific subtle styles, including hover effects and alignment.
- **`App.css`**: Handles the overall page layout and responsive grid configuration.

## 🛠️ How to Run

Follow these steps to set up and run the project locally:

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run the Development Server**:

   ```bash
   npm run dev
   ```

3. **View in Browser**:
   Open the local URL provided in the terminal (usually `http://localhost:5173`).

## 📜 Functional Requirements Met

- [x] Create a reusable student card using a functional component.
- [x] Pass student data from the parent to the child using props.
- [x] Display student details (name, department, marks) inside JSX.
- [x] Render multiple student cards with different values.
- [x] Organize the application into a parent-child structure.
- [x] Ensure dynamic content rendering.
- [x] Maintain a clean and professional interface using JSX and CSS.
