import Item from './Item';

function ItemList({ items, onRemove }) {
  // Handle empty list scenarios using conditional rendering
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks remaining. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <ul className="item-list">
        {/* Render the list dynamically using the map() function and unique keys */}
        {items.map((item) => (
          <Item key={item.id} item={item} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
