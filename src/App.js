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

  const handleselect = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
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
        <span className="arrow" onClick={() => handleselect(page - 1)}>
          ◀
        </span>
        <span>
          {[...Array(products.length / 10)].map((res, i) => (
            <span
              onClick={() => handleselect(i + 1)}
              className={page === i + 1 ? 'numbersselected' : 'numbers'}
            >
              {i + 1}
            </span>
          ))}
        </span>
        <span className="arrow" onClick={() => handleselect(page + 1)}>
          ▶
        </span>
      </div>
    </div>
  );
}
