import './App.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router";

import { Footer } from './components/Footer/Footer.jsx';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Cart } from './components/Cart/Cart.jsx';
import { SingleProductPage } from './components/SingleProductPage/SingleProductPage.jsx'
import Search from './components/Search/Search';

import { getProducts } from './services/getProducts';


function App() {

  const [products, setProducts] = useState([])
  const [items, setItems] = useState([])
  const [cartShow, setCartShow] = useState(false)
  const [productsWithAmount, setProductsWithAmount] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
    })
  }, [])


  useEffect(() => {
    let productsAmount = products.map((product) => {
      return {
        ...product,
        amount: 0,
      }
    })
    setProductsWithAmount(productsAmount);
    setFilteredProducts(productsAmount);
    if (JSON.parse(localStorage.getItem('key-ids')) !== null) {
      setItems(JSON.parse(localStorage.getItem('key-ids')))
    }
  }, [products])

  return (
    <>
      <div className='homepage'>
        <Header items={items} setCartShow={setCartShow} />
        <Search setFilteredProducts={setFilteredProducts} productsWithAmount={productsWithAmount} />
        <Routes>
          <Route path="/" element={<Navigate to='home' />} />
          <Route path="/home" element={<Main setItems={setItems} items={items} productsWithAmount={productsWithAmount} filteredProducts={filteredProducts} />} />
          <Route path="/single-product/:id" element={<SingleProductPage items={items} productsWithAmount={productsWithAmount} />} />
        </Routes>
        <Footer />
      </div>
      {cartShow &&
        <div className='modal-div'>
          <Cart items={items} setItems={setItems} cartShow={cartShow} setCartShow={setCartShow} productsWithAmount={productsWithAmount} />
        </div>
      }
    </>
  );
}

export default App;
