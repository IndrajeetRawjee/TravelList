import { useState } from "react";

export default function App() {
  const [items,setItems]=useState([]);

  function handleItems(item){
    setItems((items) => [...items,item])
  }
  function handleDelete(id){
    setItems((items)=> items.filter(item=>item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items)=> items.map(item=> item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleClearItem(){
    setItems([]);
  }
  return (
    <div className="app">
      <Logo/>
      <Form onAddItems = {handleItems}/>
      <PackingList items={items} onDeleteItem = {handleDelete} onToggleItem={handleToggleItem} onClearItem={handleClearItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo(){
  return <div>
    <h1 >Far Away</h1>
  </div> 
}

function Form({onAddItems}){
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState(1)
  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;
    const newItem = { description,quantity,packed:false,id:Date.now()};
    console.log(newItem);
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }
  return <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your trip?😍</h3>
    <select value={quantity} 
            onChange={(e)=>setQuantity(Number(e.target.value))}>
      {Array.from({length:20},(_,i)=>i+1).map(num=><option value={num} key={num}>{num}</option>)}
    </select>
    <input type="text" placeholder="items..." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
    <button>Add</button>
  </form>
  
}

function PackingList({items, onDeleteItem, onToggleItem, onClearItem}){

  const [sortBy,setSortBy]= useState('input');

  let sortedItems;

  if (sortBy==='input')sortedItems=items;

  if (sortBy==='description')sortedItems=items.slice().sort((a,b)=>a.description.localeCompare(b.description));

  if (sortBy==='packed')sortedItems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed));
  

  return <div className="list"><ul>
    {sortedItems.map((item)=>
     <Item item ={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}
     />)}
  </ul>
  
  <div className="actions">
    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}> 
      <option value='input'>Sort By input</option>
      <option value='description'>Sort By description</option>
      <option value='packed'>Sort By packed</option>
    </select>
    <button onClick={onClearItem}>Clear List</button>
  </div>
  
  
  
  </div>
  
}
function Item({item, onDeleteItem, onToggleItem}){
  return<li>
    <input type="checkbox" value={item.packed} onChange={()=> onToggleItem(item.id)}/>
    <span style={item.packed ? {textDecoration:"line-through"}:{}}>
  {item.quantity} {item.description}</span>
  <button onClick={()=>onDeleteItem(item.id)}>❌</button>
  </li>
};

function Stats({items}){
  const numItems = items.length;
  const packedItems = items.filter((items)=>items.packed).length;
  const percentPacked = Math.round(packedItems/numItems*100);

  return <div>
    <footer className="stats">{
      `You have ${numItems} items on your list, and you already packed ${packedItems}  (${percentPacked}%)`
    }
    </footer>
  </div>
}
