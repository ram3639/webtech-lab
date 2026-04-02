import { useState } from 'react';

function ItemInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        className="modern-input"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="add-button">Add</button>
    </form>
  );
}

export default ItemInput;
