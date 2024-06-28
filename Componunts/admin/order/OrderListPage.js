// OrderListPage.js

import React, { useState, useEffect } from 'react';
import './OrderListPage.css';
import { fetchOrders, fetchOrderStatuses, handleStatusChange, handleOrdersPerPageChange } from './orderHandlers';
import { showError, errorMessages } from './messages';
import OrderFilterControls from './OrderFilterControls';
import OrderList from './OrderList';
import OrderPagination from './OrderPagination'; // 페이지네이션 컴포넌트 가져오기
import OrderPaginationControls from './OrderPaginationControls'; // 페이지네이션 컨트롤 컴포넌트 가져오기
import OrderSearchComponent from './OrderSearchComponent'; // 검색 컴포넌트 가져오기
import OrderActions from './OrderActions'; // 주문 액션 컴포넌트 가져오기
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentOrders, handleCheckBoxChange, addCheckedStateToOrders, computeTotalCheckedCount, computeTotalPages, computeFilteredAndSearchedOrders } from './orderUtils'; // 유틸리티 함수 import

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]); // 빈 배열로 초기화
  const [selectedStatus, setSelectedStatus] = useState('PENDING'); // 기본값을 '전체보기'로 설정
  const [sortCriteria, setSortCriteria] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 검색 버튼을 클릭했을 때의 검색어 상태
  const [checkedOrders, setCheckedOrders] = useState(new Set()); // 체크된 주문 ID를 저장하는 Set
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 주문 목록과 주문 상태를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);

        const statusesData = await fetchOrderStatuses();
        setOrderStatuses(statusesData);
      } catch (error) {
        // 이미 개별 함수에서 오류를 처리했으므로 추가 처리 필요 없음
      }
    };

    fetchData();
  }, []);

  // 선택된 주문 상태가 변경될 때 현재 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus]);

  // 상세보기 클릭 핸들러
  const handleDetailClick = (orderId) => {
    navigate(`/admin/order/${orderId}`);

  };

  // 검색어 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearchClick = () => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  // 정렬 변경 핸들러
  const handleSortChange = (criteria, direction) => {
    setSortCriteria(criteria);
    setSortDirection(direction);
  };

  // 현재 페이지의 주문 목록을 계산
  const currentOrders = getCurrentOrders(orders, selectedStatus, sortCriteria, sortDirection, currentPage, ordersPerPage, searchQuery, checkedOrders);

  // 총 페이지 수를 계산 (검색된 주문과 상태 필터링된 주문 기준)
  const filteredAndSearchedOrders = computeFilteredAndSearchedOrders(orders, selectedStatus, searchQuery);
  const totalPages = computeTotalPages(filteredAndSearchedOrders, ordersPerPage);

  // 총 체크된 주문 개수 계산
  const totalCheckedCount = computeTotalCheckedCount(checkedOrders);

  // 각 주문에 체크 상태를 추가
  const currentOrdersWithChecked = addCheckedStateToOrders(currentOrders, checkedOrders);

  return (
    <div className="order-list-page-container">
      <Link to={'/admin/dashboard'}>
      <h1>주문 목록</h1>
      </Link>
      <div className="order-list-page-controls">
        <div className="order-count">주문목록 (총 {filteredAndSearchedOrders.length}개)</div>
        <OrderSearchComponent
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          handleSearchClick={handleSearchClick}
          setCurrentPage={setCurrentPage}
        />
        <OrderFilterControls
          orderStatuses={orderStatuses}
          selectedStatus={selectedStatus}
          onStatusChange={(e) => handleStatusChange(e, setSelectedStatus, setCurrentPage, setCheckedOrders)} // setCheckedOrders 추가
        />
        <OrderPaginationControls
          ordersPerPage={ordersPerPage}
          handleOrdersPerPageChange={(e) => handleOrdersPerPageChange(e, setOrdersPerPage, setCurrentPage)}
          totalOrders={filteredAndSearchedOrders.length}
        />
      </div>
      <OrderActions
        checkedOrders={checkedOrders}
        setCheckedOrders={setCheckedOrders}
        setOrders={setOrders}
      />
      <OrderList
        currentOrders={currentOrdersWithChecked}
        handleCheckBoxChange={(orderId, checked) => handleCheckBoxChange(orderId, checked, false, currentOrders, setCheckedOrders, sortCriteria, sortDirection, setSortCriteria, setSortDirection)}
        handleDetailClick={handleDetailClick}
        orderStatuses={orderStatuses}
        handleSortChange={handleSortChange}
        sortCriteria={sortCriteria}
        sortDirection={sortDirection}
        totalCheckedCount={totalCheckedCount}
      />
      <OrderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default OrderListPage;
