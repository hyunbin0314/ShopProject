import React from 'react';
import './SearchComponent.css';

function SearchComponent({ searchTerm, handleSearchChange, handleSearchClick, setCurrentPage }) {
  const handleAction = () => {
    handleSearchClick();
    setCurrentPage(1); // 검색 버튼을 눌렀을 때 페이지를 1로 설정
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAction();
    }
  };

  return (
    <div className="member-list-page-search-container">
      <input
        type="text"
        placeholder="회원 아이디 검색"
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown} // 엔터 키 감지
        className="member-list-page-search"
      />
      <button onClick={handleAction} className="member-list-page-search-button">검색</button>
    </div>
  );
}

export default SearchComponent;
