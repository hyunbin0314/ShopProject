import axios from 'axios';
import { showError, errorMessages } from './messages';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    const productsWithMainType = await Promise.all(response.data.map(async (product) => {
      const mainType = await fetchMainType(product.productType);
      return { ...product, mainType };
    }));
    return productsWithMainType;
  } catch (error) {
    showError(errorMessages.fetchProducts);
    throw error;
  }
};

export const fetchProductTypes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/product-types`);
    const sortedProductTypes = response.data.sort((a, b) => a.productType.localeCompare(b.productType));
    return sortedProductTypes;
  } catch (error) {
    showError(errorMessages.fetchProductTypes);
    throw error;
  }
};

export const fetchMainType = async (subType) => {
  try {
    const response = await axios.get(`${apiUrl}/api/product-types`);
    const productType = response.data.find(pt => pt.productType === subType);
    return productType ? productType.parentType : '알 수 없음';
  } catch (error) {
    console.error('메인 타입을 불러오는 도중 오류가 발생했습니다.', error);
    return '알 수 없음';
  }
};
