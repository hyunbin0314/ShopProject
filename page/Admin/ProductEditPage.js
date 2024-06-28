// src/components/page/ProductEditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAndSetProduct, fetchAndSetProductTypes, handleInputChange, handleSaveClick } from './productHandlers';
import './ProductListPage.css';

function ProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [editProductData, setEditProductData] = useState({
    productName: '',
    price: '',
    mainType: '',
    productType: '',
    imageUrl: '',
    explanation: '',
  });

  useEffect(() => {
    fetchAndSetProduct(id, setProduct, setEditProductData);
    fetchAndSetProductTypes(setProductTypes);
  }, [id]);

  const handleInputChangeWrapper = (event, key) => {
    handleInputChange(event, key, setEditProductData);
  };

  const handleSaveClickWrapper = async () => {
    await handleSaveClick(editProductData, id, [], () => {}, () => {}, setEditProductData, () => {});
    navigate('/productlistpage');
  };

  const handleCancelClick = () => {
    navigate('/productlistpage');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-edit-container">
      <h1>상품 수정</h1>
      <div className="product-edit-form">
        <label>이름</label>
        <input
          type="text"
          className="product-input"
          value={editProductData.productName}
          onChange={(e) => handleInputChangeWrapper(e, 'productName')}
        />
        <label>가격</label>
        <input
          type="number"
          className="product-input"
          value={editProductData.price}
          onChange={(e) => handleInputChangeWrapper(e, 'price')}
        />
        <label>메인 타입</label>
        <select
          className="product-input"
          value={editProductData.mainType}
          onChange={(e) => handleInputChangeWrapper(e, 'mainType')}
        >
          <option value="">선택하세요</option>
          {Array.from(new Set(productTypes.map(pt => pt.parentType))).sort().map((parentType) => (
            <option key={parentType} value={parentType}>
              {parentType}
            </option>
          ))}
        </select>
        <label>서브 타입</label>
        <select
          className={`product-input ${!editProductData.mainType ? 'disabled' : ''}`}
          value={editProductData.productType}
          onChange={(e) => handleInputChangeWrapper(e, 'productType')}
          disabled={!editProductData.mainType}
        >
          <option value="">선택하세요</option>
          {productTypes
            .filter(subType => subType.parentType === editProductData.mainType)
            .map(subType => (
              <option key={subType.productType} value={subType.productType}>
                {subType.productType}
              </option>
            ))}
        </select>
        <label>이미지 URL</label>
        <input
          type="text"
          className="product-input"
          value={editProductData.imageUrl}
          onChange={(e) => handleInputChangeWrapper(e, 'imageUrl')}
        />
        <label>설명</label>
        <textarea
          className="product-input product-textarea"
          value={editProductData.explanation}
          onChange={(e) => handleInputChangeWrapper(e, 'explanation')}
        />
        <div className="product-edit-buttons">
          <button onClick={handleSaveClickWrapper}>저장</button>
          <button onClick={handleCancelClick}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default ProductEditPage;
