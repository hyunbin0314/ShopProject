// src/components/PaginationFull.js
import React from 'react';

export function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  const maxPageButtons = 5; // 한 번에 보여줄 최대 페이지 숫자 버튼 개수
  const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

  let startPage = Math.max(1, currentPage - halfMaxPageButtons);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageButtons);

  if (currentPage <= halfMaxPageButtons) {
    endPage = Math.min(totalPages, maxPageButtons);
  }

  if (currentPage > totalPages - halfMaxPageButtons) {
    startPage = Math.max(1, totalPages - maxPageButtons + 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-buttons">
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

export function PaginationControls({ productsPerPage, handleProductsPerPageChange, totalProducts }) {
  return (
    <div className="pagination-controls">
      <label></label>
      <select value={productsPerPage} onChange={handleProductsPerPageChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={totalProducts}>전체보기</option>
      </select>
    </div>
  );
}

export const handleProductsPerPageChange = (event, setProductsPerPage, setCurrentPage) => {
  setProductsPerPage(Number(event.target.value));
  setCurrentPage(1);
};

