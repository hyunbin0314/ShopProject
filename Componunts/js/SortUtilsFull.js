import React from 'react';

export function SortControls({ handleSortChange, sortDirection, setSortDirection }) {
  return (
    <div className="sort-controls">
      <label></label>
      <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
      <select onChange={(e) => handleSortChange(e.target.value)}>
        <option value="default">기존 순서</option>
        <option value="name">이름 순서</option>
        <option value="price">가격 순서</option>
        <option value="mainType">메인 타입 순서</option>
        <option value="subType">서브 타입 순서</option>
      </select>
    </div>
  );
}

export const handleSortChange = (criteria, currentPage, sortCriteria, sortDirection, setSortCriteria, setSortDirection, localSortCriteria, setLocalSortCriteria, localSortDirection, setLocalSortDirection) => {
  if (currentPage === 1) {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('asc');
    }
  } else {
    if (localSortCriteria === criteria) {
      setLocalSortDirection(localSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setLocalSortCriteria(criteria);
      setLocalSortDirection('asc');
    }
  }
};

export const getSortedProducts = (productsToSort, criteria, direction) => {
  const sortedProducts = [...productsToSort];
  const sortDirectionMultiplier = direction === 'asc' ? 1 : -1;

  switch (criteria) {
    case 'name':
      sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName) * sortDirectionMultiplier);
      break;
    case 'price':
      sortedProducts.sort((a, b) => (a.price - b.price) * sortDirectionMultiplier);
      break;
    case 'mainType':
      sortedProducts.sort((a, b) => a.mainType.localeCompare(b.mainType) * sortDirectionMultiplier);
      break;
    case 'subType':
      sortedProducts.sort((a, b) => a.productType.localeCompare(b.productType) * sortDirectionMultiplier);
      break;
    case 'default':
    default:
      break;
  }
  return sortedProducts;
};

export const filteredProducts = (productsToFilter, selectedParentType, selectedSubType, sortCriteria, sortDirection) => {
  let filtered = productsToFilter;
  if (selectedParentType !== '전체보기' && selectedParentType !== '') {
    filtered = filtered.filter(product => product.mainType === selectedParentType);
  }
  if (selectedSubType !== '전체보기' && selectedSubType !== '') {
    filtered = filtered.filter(product => product.productType === selectedSubType);
  }
  return getSortedProducts(filtered, sortCriteria, sortDirection);
};
