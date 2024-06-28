// orderHandlers.js

import axios from 'axios';
import { showError, errorMessages } from './messages';

const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

// 주문 목록을 가져오는 함수
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/admin/orders`);
    return response.data;  // orders 데이터만 반환
  } catch (error) {
    showError(errorMessages.fetchOrders);
    throw error;
  }
};

// 주문 상태 목록을 가져오는 함수
export const fetchOrderStatuses = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/order-statuses`);
    return response.data;  // order-statuses 데이터만 반환
  } catch (error) {
    showError(errorMessages.fetchOrderStatuses);
    throw error;
  }
};

// 주문 상태 변경 핸들러
export const handleStatusChange = (event, setSelectedStatus, setCurrentPage, setCheckedOrders) => {
  setSelectedStatus(event.target.value);
  setCurrentPage(1);
  setCheckedOrders(new Set()); // 체크박스 초기화
};

// 정렬 기준 변경 핸들러
export const handleSortChange = (criteria, setSortCriteria, setSortDirection, currentDirection) => {
  setSortCriteria(criteria);
  setSortDirection(currentDirection === 'asc' ? 'desc' : 'asc');
};

// 페이지당 주문 수 변경 핸들러
export const handleOrdersPerPageChange = (event, setOrdersPerPage, setCurrentPage) => {
  setOrdersPerPage(Number(event.target.value));
  setCurrentPage(1);
};

// 주문 삭제 함수
export const deleteOrders = async (orderIds) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/admin/orders`, { data: orderIds });
    return response.data;
  } catch (error) {
    showError('주문을 삭제하는 중 오류가 발생했습니다.');
    throw error;
  }
};

// 삭제 버튼 클릭 핸들러
export const handleDeleteClick = (checkedOrders, setCheckedOrders, setOrders) => {
  if (checkedOrders.size === 0) {
    alert('삭제할 주문을 선택하세요.');
    return;
  }

  if (window.confirm('정말 삭제하시겠습니까?')) {
    deleteOrders(Array.from(checkedOrders))
      .then(() => {
        setCheckedOrders(new Set());
        fetchOrders().then(data => setOrders(data)).catch(() => showError(errorMessages.fetchOrders));
        alert('성공적으로 삭제되었습니다.');
      })
      .catch(() => showError('주문을 삭제하는 중 오류가 발생했습니다.'));
  }
};

// 주문 상태 업데이트 함수
export const updateOrderStatus = async (orderIds, status) => {
  try {
    const response = await axios.put(`${apiUrl}/api/admin/orders/status`, { orderIds, status });
    return response.data;
  } catch (error) {
    showError('주문 상태를 업데이트하는 중 오류가 발생했습니다.');
    throw error;
  }
};

// 상태 업데이트 버튼 클릭 핸들러
export const handleStatusUpdateClick = (checkedOrders, status, setCheckedOrders, setOrders) => {
  if (checkedOrders.size === 0) {
    alert(`상태를 ${status === 'COMPLETED' ? '배송완료' : '배송준비'}할 주문을 선택하세요.`);
    return;
  }

  if (window.confirm(`선택한 주문을 ${status === 'COMPLETED' ? '배송완료' : '배송준비'} 상태로 변경하시겠습니까?`)) {
    updateOrderStatus(Array.from(checkedOrders), status)
      .then(() => {
        setCheckedOrders(new Set());
        fetchOrders().then(data => setOrders(data)).catch(() => showError(errorMessages.fetchOrders));
        alert('주문 상태가 성공적으로 업데이트되었습니다.');
      })
      .catch(() => showError('주문 상태를 업데이트하는 중 오류가 발생했습니다.'));
  }
};
