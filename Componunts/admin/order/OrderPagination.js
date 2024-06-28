// OrderPagination.js

import React from 'react';
import './OrderListPage.css';

function OrderPagination({ currentPage, totalPages, setCurrentPage }) {
  const maxPageButtons = 5;
  const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.max(1, currentPage - halfMaxPageButtons);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageButtons);

  // 현재 페이지가 절반 이하인 경우 끝 페이지 조정
  if (currentPage <= halfMaxPageButtons) {
    endPage = Math.min(totalPages, maxPageButtons);
  }

  // 현재 페이지가 전체 페이지의 절반 이상인 경우 시작 페이지 조정
  if (currentPage > totalPages - halfMaxPageButtons) {
    startPage = Math.max(1, totalPages - maxPageButtons + 1);
  }

  // 페이지 번호 렌더링 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`order-pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="order-pagination-buttons">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        {'<<'}
      </button>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'disabled' : ''}
      >
        {'<'}
      </button>
      {startPage > 1 && <span>...</span>}
      {renderPageNumbers()}
      {endPage < totalPages && <span>...</span>}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? 'disabled' : ''}
      >
        {'>'}
      </button>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        className={currentPage === totalPages ? 'disabled' : ''}
      >
        {'>>'}
      </button>
    </div>
  );
}

export default OrderPagination;