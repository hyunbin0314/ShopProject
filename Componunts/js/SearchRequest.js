import React, { useEffect, useState } from 'react';
import '../css/Goods.css'; // 스타일 파일 경로 수정

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const SearchRequest = () => {
  // const [searchTerm] = useState('');
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // const filteredProducts = products.filter(product =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (keyword) {
      console.log(`Searching for keyword: ${keyword}`);
      setLoading(true);
      axios.get('http://localhost:8080/api/search/all', {
        params: { keyword }
      })
      .then(response => {
        console.log('Search results:', response.data);
        setProducts(response.data.results || response.data); // Ensure data is an array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
    }
  }, [keyword]);
  



  return (
    <div className="goods">
      <div className="product-list">
        {chunkArray(products, 4).map((column, columnIndex) => (
          <div key={columnIndex} className="product-column">
            {column.map(product => (
              <Link to={`/product/detail/${product.id}`} key={product.id}>
                <div className="product-card">
                  <img src={product.imageUrl} alt={product.productName} />
                  <h2 dangerouslySetInnerHTML={{ __html: product.productName }}></h2>
                  <p className='price'><strong>{product.price.toLocaleString()}원</strong></p>
                  <p className="delivery"><strong>배송업체 : 대우배송 {product.delivery}</strong></p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <button className="top-btn" onClick={handleScrollToTop}><strong>▲<br />Top</strong></button>
    </div>
  );
};

// 배열을 특정한 개수씩 나누는 함수
const chunkArray = (arr, size) => {
    return Array.from({ length: size }, (_, index) => {
      return arr.filter((_, idx) => idx % size === index);
    });
  };
  

export default SearchRequest;
