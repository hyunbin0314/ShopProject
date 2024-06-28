// orderUtils.js

// 주문 상태 필터링 함수
export const filteredOrders = (orders, selectedStatus) => {
  if (selectedStatus === '전체보기') {
    return orders;
  }
  return orders.filter(order => order.status === selectedStatus);
};

// 검색어로 주문 필터링 함수
export const searchedOrders = (orders, searchTerm) => {
  if (!searchTerm) {
    return orders;
  }
  // 검색어로 주문 번호를 필터링
  return orders.filter(order => 
    order.id.toString().includes(searchTerm)
  );
};

// 정렬 함수
export const sortedOrders = (orders, selectedStatus, sortCriteria, sortDirection, searchTerm, checkedOrders) => {
  const filtered = filteredOrders(orders, selectedStatus);
  const searched = searchedOrders(filtered, searchTerm);
  if (sortCriteria === 'default') {
    return searched;
  }
  return [...searched].sort((a, b) => {
    if (sortCriteria === 'checked') {
      const aChecked = checkedOrders.has(a.id);
      const bChecked = checkedOrders.has(b.id);
      return sortDirection === 'asc' ? (aChecked === bChecked ? 0 : aChecked ? 1 : -1) : (aChecked === bChecked ? 0 : aChecked ? -1 : 1);
    }
    if (sortCriteria === 'date') {
      const dateA = new Date(a.createDate);
      const dateB = new Date(b.createDate);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortCriteria === 'totalPrice') {
      return sortDirection === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    }
    if (sortCriteria === 'status') {
      return sortDirection === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
    }
    if (sortCriteria === 'id') {
      return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
    }
    if (sortCriteria === 'productName') {
      return sortDirection === 'asc' ? a.orderItems[0].productName.localeCompare(b.orderItems[0].productName) : b.orderItems[0].productName.localeCompare(a.orderItems[0].productName);
    }
    return 0;
  });
};

// 현재 페이지의 주문 목록을 반환하는 함수
export const getCurrentOrders = (orders, selectedStatus, sortCriteria, sortDirection, currentPage, ordersPerPage, searchTerm, checkedOrders) => {
  const sorted = sortedOrders(orders, selectedStatus, sortCriteria, sortDirection, searchTerm, checkedOrders);
  return sorted.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
};

// 체크박스 변경 핸들러 함수
export const handleCheckBoxChange = (orderId, checked, isSelectAll, currentOrders, setCheckedOrders, sortCriteria, sortDirection, setSortCriteria, setSortDirection) => {
  setCheckedOrders(prevCheckedOrders => {
    const updatedCheckedOrders = new Set(prevCheckedOrders);
    if (isSelectAll) {
      currentOrders.forEach(order => {
        if (checked) {
          updatedCheckedOrders.add(order.id);
        } else {
          updatedCheckedOrders.delete(order.id);
        }
      });
    } else {
      if (checked) {
        updatedCheckedOrders.add(orderId);
      } else {
        updatedCheckedOrders.delete(orderId);
      }
    }
    return updatedCheckedOrders;
  });

  // 체크박스가 변경될 때 정렬 방향을 변경
  if (sortCriteria === 'checked' && sortDirection === 'asc') {
    setSortDirection('desc');
  }
};

// 각 주문에 체크 상태를 추가하는 함수
export const addCheckedStateToOrders = (currentOrders, checkedOrders) => {
  return currentOrders.map(order => ({
    ...order,
    checked: checkedOrders.has(order.id)
  }));
};

// 총 체크된 주문 개수를 계산하는 함수
export const computeTotalCheckedCount = (checkedOrders) => {
  return checkedOrders.size;
};

// 총 페이지 수를 계산하는 함수
export const computeTotalPages = (filteredAndSearchedOrders, ordersPerPage) => {
  return Math.ceil(filteredAndSearchedOrders.length / ordersPerPage);
};

// 검색된 주문과 상태 필터링된 주문을 계산하는 함수
export const computeFilteredAndSearchedOrders = (orders, selectedStatus, searchQuery) => {
  return searchedOrders(filteredOrders(orders, selectedStatus), searchQuery);
};
