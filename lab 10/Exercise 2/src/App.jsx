import { useState } from 'react';
import ItemInput from './components/ItemInput';
import ItemList from './components/ItemList';
import './index.css';

function App() {
  // Store multiple items in a state variable using the useState Hook (array state)
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React components' },
    { id: 2, text: 'Understand useState hook' },
    { id: 3, text: 'Master list rendering with keys' },
  ]);

  // Add new items to the list through user input using state update with useState
  const addItem = (text) => {
    const newItem = {
      id: Date.now(), // Assign a unique identifier to each item
      text: text
    };
    // Update the list dynamically
    setItems([...items, newItem]);
  };

  // Remove items from the list using event handling
  const removeItem = (id) => {
    // Update the list dynamically after remove operations
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Task Manager</h1>
        {/* Maintain separation between input logic and display logic using component structuring */}
        <ItemInput onAdd={addItem} />
        <ItemList items={items} onRemove={removeItem} />
      </div>
    </div>
  );
}

export default App;
