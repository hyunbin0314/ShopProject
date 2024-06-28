// OrderSearchComponent.js

import React from 'react';
import './OrderListPage.css';

function OrderSearchComponent({ searchTerm, handleSearchChange, handleSearchClick, setCurrentPage }) {
  // 검색 버튼 클릭 또는 Enter 키 입력 처리 함수
  const handleAction = () => {
    handleSearchClick();
    setCurrentPage(1); // 검색 버튼을 눌렀을 때 페이지를 1로 설정
  };

  // Enter 키 입력 처리 함수
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAction();
    }
  };

  return (
    <div className="order-search-component-container">
      <input
        type="text"
        placeholder="주문 번호 검색"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // 엔터 키 감지
        className="order-search-component"
      />
      <button onClick={handleAction} className="order-search-component-button">검색</button>
    </div>
  );
}

export default OrderSearchComponent;