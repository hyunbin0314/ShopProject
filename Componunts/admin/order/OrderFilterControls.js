// OrderFilterControls.js

import React from 'react';

// 주문 상태 필터 컴포넌트
function OrderFilterControls({ orderStatuses, selectedStatus, onStatusChange }) {
  return (
    <div className="order-filter-controls-container">
      <select value={selectedStatus} onChange={onStatusChange} className="order-filter-controls-select">
        <option value="전체보기">전체보기</option>
        {orderStatuses.map(status => (
          <option key={status.status} value={status.status}>{status.displayName}</option>
        ))}
      </select>
    </div>
  );
}

export default OrderFilterControls;
