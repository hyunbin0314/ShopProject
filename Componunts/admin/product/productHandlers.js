import axios from 'axios';
import { showError, errorMessages } from './messages';
import { getSortedProducts, filteredProducts } from './SortUtilsFull';
import { fetchProducts, fetchProductTypes, fetchMainType } from './productListPageApi';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

const validateProductData = (data) => {
  if (!data.productName) {
    alert('이름 칸을 입력해야 합니다.');
    return false;
  }
  if (isNaN(data.price) || data.price === '') {
    alert('가격 칸에는 숫자만 입력해야 합니다.');
    return false;
  }
  if (!data.mainType || data.mainType === '선택하세요') {
    alert('메인 타입을 선택해야 합니다.');
    return false;
  }
  if (!data.productType || data.productType === '선택하세요') {
    alert('서브 타입을 선택해야 합니다.');
    return false;
  }
  if (!data.imageUrl) {
    alert('이미지 URL 칸을 입력해야 합니다.');
    return false;
  }
  if (!data.explanation) {
    alert('설명 칸을 입력해야 합니다.');
    return false;
  }
  return true;
};

export const handleSaveClick = async (editProductData, editProductId, setProducts, setEditProductId, setEditProductData, setDisplayedProductCount) => {


  try {
    const productToUpdate = { ...editProductData , id: editProductId};
    console.log('Sending product data to update:', productToUpdate);
    await axios.put(`${apiUrl}/api/products/${editProductId}`, productToUpdate);
    alert('성공적으로 저장되었습니다.');
  } catch (error) {
    showError(errorMessages.saveProduct);
  }
};

export const handleCancelClick = (setEditProductId, setEditProductData) => {
  setEditProductId(null);
  setEditProductData(null);
};

export const handleDeleteClick = async (productId, products, setProducts, setDisplayedProductCount) => {
  if (window.confirm('정말 삭제하시겠습니까?')) {
    try {
      await axios.delete(`${apiUrl}/api/products/${productId}`);
      const updatedProducts = await fetchProducts(); // 최신 제품 목록을 가져옴
      setProducts(updatedProducts);
      setDisplayedProductCount(filteredProducts(updatedProducts).length);
      alert('성공적으로 삭제되었습니다.');
    } catch (error) {
      showError(errorMessages.deleteProduct);
    }
  }
};

// ProductEditPage에서 사용되는 함수 추가
export const fetchAndSetProduct = async (id, setProduct, setEditProductData) => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/${id}`);
    const productData = response.data;
    setProduct(productData);
    setEditProductData({
      productName: productData.productName,
      price: productData.price,
      mainType: productData.mainType,
      productType: productData.productType,
      imageUrl: productData.imageUrl,
      explanation: productData.explanation
    });
  } catch (error) {
    console.error('Failed to fetch product data:', error);
  }
};

export const fetchAndSetProductTypes = async (setProductTypes) => {
  try {
    const response = await axios.get(`${apiUrl}/api/product-types`);
    setProductTypes(response.data);
  } catch (error) {
    console.error('Failed to fetch product types:', error);
  }
};

export const handleEditClick = (productId, products, setEditProductData, setEditProductId) => {
  const productToEdit = products.find(product => product.id === productId);
  setEditProductData({ ...productToEdit });
  setEditProductId(productId);
};

export const handleInputChange = (event, key, setEditProductData) => {
  const { value } = event.target;
  setEditProductData(prevState => ({
    ...prevState,
    [key]: value
  }));

  if (key === 'mainType') {
    setEditProductData(prevState => ({
      ...prevState,
      productType: ''
    }));
  }
};

export const handleKeyDown = (event) => {
  const { key } = event;
  const isControlKey = key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab';
  if (!/^\d$/.test(key) && !isControlKey) {
    event.preventDefault();
  }
};

export const handleShowProductsClick = async (setProducts, setShowProducts, setDisplayedProductCount, setCurrentPage, setSortCriteria, setSortDirection, setLocalSortCriteria, setLocalSortDirection) => {
  const products = await fetchProducts(); // 최신 제품 목록을 가져옴
  setProducts(products);
  setShowProducts(true);
  setDisplayedProductCount(filteredProducts(products).length);
  setCurrentPage(1);
  setSortCriteria('default');
  setSortDirection('asc');
  setLocalSortCriteria('default');
  setLocalSortDirection('asc');
};

export const handleParentTypeChange = (event, setSelectedParentType, setSelectedSubType, setShowProducts) => {
  setSelectedParentType(event.target.value);
  setSelectedSubType('');
  setShowProducts(false);
};

export const handleSubTypeChange = (event, setSelectedSubType, setShowProducts) => {
  setSelectedSubType(event.target.value);
  setShowProducts(false);
};
