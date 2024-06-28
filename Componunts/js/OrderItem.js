// OrderItem.js

import React from 'react';

const OrderItem = ({ order }) => {
  return (
    <div className="order-item">
      <h2>주문 번호: {order.id}</h2>
      <p>상품명: {order.goods}</p>
      <p>수량: {order.count}</p>
      <p>주문일시: {order.date}</p>
      {/* 필요한 주문 정보를 추가하세요 */}
    </div>
  );
};

export default OrderItem;
