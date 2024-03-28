export function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((items) => items.packed).length;
  const percentPacked = Math.round(packedItems / numItems * 100);

  return <div>
    <footer className="stats">{`You have ${numItems} items on your list, and you already packed ${packedItems}  (${percentPacked}%)`}
    </footer>
  </div>;
}
