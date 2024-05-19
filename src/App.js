import './App.css';
import React,{ useState } from 'react';
import Cart from "./Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  const [arr, setArr] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function Create(name, price) {
    this.product = name;
    this.price = price;
  }
  let submit = (e) => {
    e.preventDefault();
    if((name!=="")&&(price!=="")){
      let obj = new Create(name, price);
      setArr([...arr, obj]);
      setName('');
      setPrice('');
    }
  };
  return (
    <main id="m">
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <form className="d-flex" role="search" onSubmit={submit}>
          <input className="form-control me-2" type="search" placeholder="Add item" aria-label="Search" 
          value={name} 
          onChange={(e)=>{
            e.preventDefault();
            setName(e.target.value);
          }} />
          <input className="form-control me-2" type="search" placeholder="Add price" aria-label="Search" 
          value={price} 
          onChange={(e)=>{
            e.preventDefault();
            setPrice(e.target.value);
          }} />
          <button className="btn btn-outline-success" type="submit">Add</button>
        </form>
      </div>
    </nav>
    <Cart arr={arr} />
    </main>
  );
}

export default App;