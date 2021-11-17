import React from "react";
import { useEffect, useState } from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Cart.css";

export const Cart = ({
  setItems,
  cartShow,
  setCartShow,
  productsWithAmount,
  items,
}) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const filtered = productsWithAmount.filter((product) =>
      items.includes(product.id)
    );
    setSelectedProducts(filtered);
  }, [items, productsWithAmount]);

  const calculate = () => {
    let sumF = 0;
    selectedProducts.forEach((product) => {
      sumF += product.price * product.amount;
      setSum(sumF);
    });
  };

  const clearCart = () => {
    setSelectedProducts([]);
    setItems([]);
    localStorage.removeItem("key-ids");
    productsWithAmount.forEach((product) => {
      product.amount = 0;
    });
  };

  return (
    <div className="cart">
      {selectedProducts.map((product) => {
        return (
          <SingleProduct
            product={product}
            key={product.id}
            items={items}
            selectedProducts={selectedProducts}
            calculate={calculate}
          />
        );
      })}
      <h3
        onClick={() => {
          setCartShow(false);
        }}
      >
        <FontAwesomeIcon
          className={"faClosedCaptioning"}
          icon={faWindowClose}
        ></FontAwesomeIcon>
      </h3>
      <div className="modul-btns-selected-products">
        <button className="btn-total-cart" onClick={calculate}>
          Add To Cart
        </button>
        {selectedProducts.length > 0 ? (
          <h2 className="total">Total: ${sum.toFixed(2)}</h2>
        ) : (
          <h2 className="total">Total: ${0}</h2>
        )}
        <button className="btn-clear-cart" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};
