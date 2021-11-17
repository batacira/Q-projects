import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./Search.css";

function Search({ productsWithAmount, setFilteredProducts }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filterProducts = productsWithAmount.filter((product) => {
      return product.title.toLowerCase().includes(searchQuery);
    });
    setFilteredProducts(filterProducts);
  }, [searchQuery]);

  return (
    <div>
      <input
        className="search"
        onChange={(event) => setSearchQuery(event.target.value.toLowerCase())}
        type="text"
      />
      <FontAwesomeIcon
        className={"search-products"}
        icon={faSearch}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Search;
