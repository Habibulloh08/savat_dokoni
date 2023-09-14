import React, { useEffect, useState } from "react";
import "./App.css";
import { message } from "antd";

let url = "https://fakestoreapi.com/products";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const fetcheUser = async (url) => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const users = await resp.json();
      setLoading(false);
      setData(users);
    } catch (error) {
      message.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcheUser(url);
  }, []);

  return (
    <div className="container">
      <h2>Savat Do'koni</h2>
      <div className="filtr">
        <div className="filter-buttons">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("men's clothing")}>Man</button>
          <button onClick={() => setFilter("women's clothing")}>Women</button>
          <button onClick={() => setFilter("electronics")}>Electronics</button>
        </div>
        <div className="filtr-search">
          <input
            type="text"
            placeholder="Maxsulotlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div id="product">
        {data
          .filter((product) => {
            const titleMatch = product.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

            if (filter === "All") {
              return titleMatch;
            } else {
              return (
                (product.category === filter ||
                  product.title.includes(filter)) &&
                titleMatch
              );
            }
          })
          .map((product) => (
            <div className="details cart" key={product.id}>
              <img src={product.image} alt="" className="details-img" />
              <div className="content">
                <div className="row">
                  <h2>{product.title}</h2>
                  <span>${product.price}$</span>
                </div>
                <p>{product.description}</p>
                <p>{product.content}</p>
                <div className="amount">
                  <span>⭐⭐⭐{product.rating.rate}</span>
                </div>
              </div>
              <div className="delete">
                <button onClick={() => removeProduct(product.id)}>X</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
