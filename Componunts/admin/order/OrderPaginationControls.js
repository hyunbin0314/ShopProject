// OrderPaginationControls.js

import React from 'react';
import './OrderListPage.css';

function OrderPaginationControls({ ordersPerPage, handleOrdersPerPageChange, totalOrders }) {
  return (
    <div className="order-pagination-controls">
      <label htmlFor="orders-per-page"></label>
      <select
        id="orders-per-page"
        value={ordersPerPage}
        onChange={handleOrdersPerPageChange}
        className="order-pagination-select"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={totalOrders}>전체</option>
      </select>
    </div>
  );
}

export default OrderPaginationControls;