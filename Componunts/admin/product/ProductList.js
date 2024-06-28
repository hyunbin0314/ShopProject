import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({
  currentProducts,
  editProductId,
  editProductData,
  handleInputChange,
  handleKeyDown,
  uniqueParentTypes,
  productTypes,
  handleSaveClickWrapper,
  handleCancelClickWrapper,
  handleEditClick,
  handleDeleteClickWrapper
}) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>메인 타입</th>
          <th>서브 타입</th>
          <th>상품명</th>
          <th>가격</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {currentProducts.map(product => (
          <tr key={product.id} className="product-row">
            <td className="product-field">
              {editProductId === product.id ? (
                <select
                  className="product-input"
                  value={editProductData.mainType}
                  onChange={(e) => handleInputChange(e, 'mainType')}
                >
                  <option value="">선택하세요</option>
                  {uniqueParentTypes.map((parentType) => (
                    <option key={parentType} value={parentType}>
                      {parentType}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="product-main-type">{product.mainType}</div>
              )}
            </td>
            <td className="product-field">
              {editProductId === product.id ? (
                <select
                  className={`product-input ${!editProductData.mainType ? 'disabled' : ''}`}
                  value={editProductData.productType}
                  onChange={(e) => handleInputChange(e, 'productType')}
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
              ) : (
                <div className="product-sub-type">{product.productType}</div>
              )}
            </td>
            <td className="product-field">
              {editProductId === product.id ? (
                <input
                  type="text"
                  className="product-input"
                  value={editProductData.productName}
                  onChange={(e) => handleInputChange(e, 'productName')}
                />
              ) : (
                <div className="product-name">{product.productName}</div>
              )}
            </td>
            <td className="product-field">
              {editProductId === product.id ? (
                <input
                  type="number"
                  className="product-input"
                  value={editProductData.price}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              ) : (
                <div className="product-price">{`${product.price.toLocaleString()}원`}</div>
              )}
            </td>
            <td className="product-list-buttons">
              {editProductId === product.id ? (
                <>
                  <button onClick={handleSaveClickWrapper}>저장</button>
                  <button onClick={handleCancelClickWrapper}>취소</button>
                </>
              ) : (
                <>
                  <Link to={`/admin/product/${product.id}`}>
                    <button>수정</button>
                  </Link>
                  <button onClick={() => handleDeleteClickWrapper(product.id)}>삭제</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
