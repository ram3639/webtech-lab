function Item({ item, onRemove }) {
  return (
    <li className="item-row">
      <span className="item-text">{item.text}</span>
      <button 
        className="remove-button" 
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </li>
  );
}

export default Item;
