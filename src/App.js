import React, { useEffect, useState } from 'react';
import './style.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    getLLProducts();
  }, []);

  const getLLProducts = () => {
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  };

  return (
    <div>
      {products.length > 0 &&
        products.slice(page * 10 - 10, page * 10).map((res) => {
          return (
            <div className="products" key={res.id}>
              <img className="image" src={res.thumbnail} alt={res.title} />
              {res.title}
            </div>
          );
        })}
      <div>
        <span onClick={() => setPage(page - 1)}>◀</span>
        <span>{[...Array(products.length / 10)].map((res, i) => i)}</span>
        <span onClick={() => setPage(page + 1)}>▶</span>
      </div>
    </div>
  );
}
