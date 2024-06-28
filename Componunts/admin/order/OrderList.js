// OrderList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 주문 목록 컴포넌트
function OrderList({ currentOrders, handleCheckBoxChange, handleDetailClick, orderStatuses, handleSortChange, sortCriteria, sortDirection, totalCheckedCount }) {
  const [selectAll, setSelectAll] = useState(false); // 전체 선택 상태 관리

  useEffect(() => {
    const allChecked = currentOrders.length > 0 && currentOrders.every(order => order.checked);
    setSelectAll(allChecked);
  }, [currentOrders]);

  const getProductName = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return '상품 없음'; // 주문한 상품이 없는 경우
    if (orderItems.length === 1) {
      return orderItems[0].productName || '상품 이름 없음'; // 주문한 상품이 1개인 경우
    }
    return `${orderItems[0].productName || '상품 이름 없음'} 외 ${orderItems.length - 1}개`; // 주문한 상품이 2개 이상인 경우
  };

  // 주문 상태의 displayName을 반환하는 함수
  const getStatusDisplayName = (status) => {
    const foundStatus = orderStatuses.find(s => s.status === status);
    return foundStatus ? foundStatus.displayName : status;
  };

  // 가격을 콤마 형식으로 변환하고 '원'을 붙이는 함수
  const formatPrice = (price) => {
    return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
  };

  // 전체 선택 체크박스 변경 핸들러
  const handleSelectAllChange = (e) => {
    const { checked } = e.target;
    setSelectAll(checked);
    currentOrders.forEach(order => handleCheckBoxChange(order.id, checked, true)); // forceUpdate 플래그 추가
  };

  // 개별 체크박스 변경 핸들러
  const handleIndividualCheckBoxChange = (orderId, checked) => {
    handleCheckBoxChange(orderId, checked, false); // forceUpdate 플래그 추가
  };

  // 정렬 방향 표시용 삼각형
  const getSortIcon = (criteria) => {
    if (sortCriteria === criteria) {
      return sortDirection === 'asc' ? '▲' : '▼';
    }
    return '▼'; // 기본값 내림차순
  };

  // 정렬 버튼 클릭 핸들러
  const handleSortButtonClick = (criteria) => {
    const direction = sortCriteria === criteria && sortDirection === 'asc' ? 'desc' : 'asc';
    handleSortChange(criteria, direction);
  };

  return (
    <table className="order-list-table">
      <thead>
        <tr>
          <th style={{ width: '5%' }}>
            <div className="order-list-column-header">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                className="order-list-checkbox"
              />
              <button onClick={() => handleSortButtonClick('checked')}>
                {getSortIcon('checked')}
              </button>
            </div>
            <div className="checked-count">({totalCheckedCount}개 선택됨)</div>
          </th>
          <th style={{ width: '10%' }}>
            <div className="order-list-column-header">
              <span>주문번호</span>
              <button onClick={() => handleSortButtonClick('id')}>
                {getSortIcon('id')}
              </button>
            </div>
          </th>
          <th style={{ width: '30%' }}>
            <div className="order-list-column-header">
              <span>상품명</span>
              <button onClick={() => handleSortButtonClick('productName')}>
                {getSortIcon('productName')}
              </button>
            </div>
          </th>
          <th style={{ width: '15%' }}>
            <div className="order-list-column-header">
              <span>총가격</span>
              <button onClick={() => handleSortButtonClick('totalPrice')}>
                {getSortIcon('totalPrice')}
              </button>
            </div>
          </th>
          <th style={{ width: '20%' }}>
            <div className="order-list-column-header">
              <span>주문상태</span>
              <button onClick={() => handleSortButtonClick('status')}>
                {getSortIcon('status')}
              </button>
            </div>
          </th>
          <th style={{ width: '10%' }}>관리</th>
        </tr>
      </thead>
      <tbody>
        {currentOrders.map((order, index) => (
          <tr key={order.id} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#E6F7FF' }}>
            <td>
              <input
                type="checkbox"
                checked={order.checked || false}
                onChange={(e) => handleIndividualCheckBoxChange(order.id, e.target.checked)}
                className="order-list-checkbox"
              />
            </td>
            <td>{order.id}</td>
            <td>{getProductName(order.orderItems)}</td>
            <td>{formatPrice(order.totalPrice)}</td>
            <td>{getStatusDisplayName(order.status)}</td>
            <td>
              <button onClick={() => handleDetailClick(order.id)} className="order-list-detail-button">상세정보</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderList;
