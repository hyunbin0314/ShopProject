// OrderActions.js

import React from 'react';
import { handleDeleteClick, handleStatusUpdateClick } from './orderHandlers';

// 주문 액션 컴포넌트
function OrderActions({ checkedOrders, setCheckedOrders, setOrders }) {
  return (
    <div className="order-list-page-actions">
      <button onClick={() => handleDeleteClick(checkedOrders, setCheckedOrders, setOrders)} className="delete-button">삭제</button>
      <button onClick={() => handleStatusUpdateClick(checkedOrders, 'COMPLETED', setCheckedOrders, setOrders)} className="status-button">배송완료</button>
      <button onClick={() => handleStatusUpdateClick(checkedOrders, 'PENDING', setCheckedOrders, setOrders)} className="status-button">배송준비</button>
    </div>
  );
}

export default OrderActions;
