import React, { useState, useEffect } from 'react';
import './PriceEdit.css';
import Logo from '../../assets/Logo.png'; // 로고 이미지 경로에 따라 수정해야 합니다.

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

const PriceEdit = () => {
  const [product, setProduct] = useState({
    productName: '',
    price: '',
    subType: '',
    imageUrl: '',
    description: ''
  });
  const [productTypes, setProductTypes] = useState([]);
  const [type, setType] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/api/product-types`)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => setProductTypes(data))
      .catch(error => console.error('타입 정보 로드 중 오류 발생:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setType(value);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log('등록된 상품:', product);

    const productData = {
      ...product,
      productType: product.subType, // productType 필드로 subType 값을 전달
      explanation: product.description // description 값을 explanation으로 전달
    };

    fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        alert('성공적으로 등록되었습니다.');
        setProduct({
          productName: '',
          price: '',
          subType: '',
          imageUrl: '',
          description: ''
        });
        setType('');
      })
      .catch(error => {
        alert('상품 등록 중 오류 발생: ' + error.message);
      });
  };

  const uniqueParentTypes = Array.from(new Set(productTypes.map(item => item.parentType)));

  return (
    <div className="price-edit-container">
      <div className="price-edit">
        <img src={Logo} alt="로고" className="Admin-logo" />
        <h2>[관리자전용 상품 등록]</h2>
        <form onSubmit={handleProductSubmit}>
          <div className="Adiminform-group">
            <label>상품명</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="Adiminform-group">
            <label>가격</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="Adiminform-group">
            <label>타입</label>
            <select
              name="type"
              value={type}
              onChange={handleTypeChange}
              required
            >
              <option value="">선택하세요</option>
              {uniqueParentTypes.map((parentType) => (
                <option key={parentType} value={parentType}>
                  {parentType}
                </option>
              ))}
            </select>
          </div>
          <div className="Adiminform-group">
            <label>서브타입</label>
            <select
              name="subType"
              value={product.subType}
              onChange={handleInputChange}
              required
              disabled={!type} // 타입 선택 전에는 서브타입 선택을 비활성화
            >
              <option value="">선택하세요</option>
              {productTypes
                .filter(subType => subType.parentType === type)
                .map(subType => (
                  <option key={subType.productType} value={subType.productType}>
                    {subType.productType}
                  </option>
                ))}
            </select>
          </div>
          <div className="Adiminform-group">
            <label>이미지 URL</label>
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="Adiminform-group">
            <label>상품 설명</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="AdminEdit-button">상품 등록</button>
        </form>
      </div>
    </div>
  );
};

export default PriceEdit;
