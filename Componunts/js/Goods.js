import React, { useEffect, useState } from 'react';
import '../css/Goods.css'; // 스타일 파일 경로 수정

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const Goods = () => {
  // const [searchTerm] = useState('');
  const { categoryId } = useParams();
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
    if (categoryId) {
      console.log(`Fetching products for category: ${categoryId}`);
      setLoading(true);
      axios.get(`http://localhost:8080/api/products/category/${categoryId}`)
      .then(response => {
        console.log('Category products:', response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
    }
  }, [categoryId]);

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

export default Goods;
