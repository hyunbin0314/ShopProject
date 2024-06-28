import React, { useState, useEffect } from 'react';
import './ProductListPage.css';
import { fetchProducts, fetchProductTypes, fetchMainType } from './productListPageApi';
import { showError, errorMessages } from './messages';
import FilterControls from './FilterControls';
import { SortControls, handleSortChange, getSortedProducts, filteredProducts } from './SortUtilsFull';
import { Pagination, PaginationControls, handleProductsPerPageChange } from './PaginationFull';
import ProductList from './ProductList';
import { handleSaveClick, handleCancelClick, handleDeleteClick, handleEditClick, handleInputChange, handleKeyDown, handleShowProductsClick, handleParentTypeChange, handleSubTypeChange } from './productHandlers';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedParentType, setSelectedParentType] = useState('전체보기');
  const [selectedSubType, setSelectedSubType] = useState('전체보기');
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState(null);
  const [error, setError] = useState('');
  const [showProducts, setShowProducts] = useState(true);
  const [displayedProductCount, setDisplayedProductCount] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const [localSortCriteria, setLocalSortCriteria] = useState('default');
  const [localSortDirection, setLocalSortDirection] = useState('asc');
  const [mainType, setMainType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productTypesData, productsData] = await Promise.all([
          fetchProductTypes(),
          fetchProducts(),
        ]);
        setProductTypes(productTypesData);
        setProducts(productsData);

        // 선택된 서브 타입이 있을 때 메인 타입을 가져옴
        if (selectedSubType !== '전체보기') {
          const mainTypeData = await fetchMainType(selectedSubType);
          setMainType(mainTypeData);
        } else {
          setMainType('전체보기');
        }
      } catch (error) {
        showError(errorMessages.fetchProductTypes);
        showError(errorMessages.fetchProducts);
        showError(errorMessages.fetchMainType);
      }
    };

    fetchData();
  }, [selectedSubType]);

  useEffect(() => {
    if (selectedParentType === '전체보기') {
      setSelectedSubType('전체보기');
    }
    handleShowProductsClickWrapper();
  }, [selectedParentType, selectedSubType]);

  const handleEditClickWrapper = (productId) => {
    handleEditClick(productId, products, setEditProductData, setEditProductId);
  };

  const handleInputChangeWrapper = (event, key) => {
    handleInputChange(event, key, setEditProductData);
  };

  const handleShowProductsClickWrapper = () => {
    handleShowProductsClick(setProducts, setShowProducts, setDisplayedProductCount, setCurrentPage, setSortCriteria, setSortDirection, setLocalSortCriteria, setLocalSortDirection);
    setEditProductId(null);
    setEditProductData(null);
  };

  const handleParentTypeChangeWrapper = (event) => {
    handleParentTypeChange(event, setSelectedParentType, setSelectedSubType, setShowProducts);
    if (event.target.value !== '전체보기') {
      setSelectedSubType('전체보기');
    }
    setEditProductId(null);
    setEditProductData(null);
  };

  const handleSubTypeChangeWrapper = (event) => {
    handleSubTypeChange(event, setSelectedSubType, setShowProducts);
    setEditProductId(null);
    setEditProductData(null);
  };

  const handleSortChangeWrapper = (criteria) => {
    handleSortChange(criteria, currentPage, sortCriteria, sortDirection, setSortCriteria, setSortDirection, localSortCriteria, setLocalSortCriteria, localSortDirection, setLocalSortDirection);
  };

  const handleSaveClickWrapper = () => {
    handleSaveClick(editProductData, editProductId, products, setProducts, setEditProductId, setEditProductData, setDisplayedProductCount);
  };

  const handleCancelClickWrapper = () => {
    handleCancelClick(setEditProductId, setEditProductData);
  };

  const handleDeleteClickWrapper = (productId) => {
    handleDeleteClick(productId, products, setProducts, setDisplayedProductCount);
  };

  const filteredProductsWrapper = (productsToFilter = products) => {
    return filteredProducts(productsToFilter, selectedParentType, selectedSubType, sortCriteria, sortDirection);
  };

  const uniqueParentTypes = Array.from(new Set(productTypes.map(item => item.parentType))).sort();
  const sortedParentTypes = ["전체보기", ...uniqueParentTypes.filter(item => item !== "전체보기")];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  let currentProducts = filteredProductsWrapper().slice(indexOfFirstProduct, indexOfLastProduct);

  currentProducts = getSortedProducts(currentProducts, localSortCriteria, localSortDirection);

  const totalPages = Math.ceil(filteredProductsWrapper().length / productsPerPage);

  return (
    <div className="product-list-container">
      <h1>Logo 사진파일 들어갈 예정입니다.(사진이 집컴에 없음)</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {showProducts && (
        <>
          <table className="control-table">
            <tbody>
              <tr>
                <td><div className="product-count">상품목록 (총 {filteredProductsWrapper().length}개)</div></td>
                <td>
                  <FilterControls
                    productTypes={productTypes}
                    selectedParentType={selectedParentType}
                    selectedSubType={selectedSubType}
                    onParentTypeChange={handleParentTypeChangeWrapper}
                    onSubTypeChange={handleSubTypeChangeWrapper}
                  />
                </td>
                <td>
                  <SortControls 
                    handleSortChange={handleSortChangeWrapper} 
                    sortDirection={sortDirection} 
                    setSortDirection={setSortDirection} 
                  />
                </td>
                <td>
                  <PaginationControls 
                    productsPerPage={productsPerPage} 
                    handleProductsPerPageChange={(e) => handleProductsPerPageChange(e, setProductsPerPage, setCurrentPage)} 
                    totalProducts={filteredProductsWrapper().length} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="table-container">
            <ProductList
              currentProducts={currentProducts}
              editProductId={editProductId}
              editProductData={editProductData}
              handleInputChange={handleInputChangeWrapper}
              handleKeyDown={handleKeyDown}
              uniqueParentTypes={sortedParentTypes}
              productTypes={productTypes}
              handleSaveClickWrapper={handleSaveClickWrapper}
              handleCancelClickWrapper={handleCancelClickWrapper}
              handleEditClick={handleEditClickWrapper}
              handleDeleteClickWrapper={handleDeleteClickWrapper}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default ProductListPage;
