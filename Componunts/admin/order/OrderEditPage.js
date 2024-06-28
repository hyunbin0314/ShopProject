// OrderEditPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderListPage.css'; // CSS 파일 import
const apiUrl = process.env.REACT_APP_API_URL || 'http://1.226.84.83:8080';

function OrderEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [member, setMember] = useState(null);
  const [editOrderData, setEditOrderData] = useState({
    status: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 주문 정보를 가져옴
        const orderResponse = await axios.get(`${apiUrl}/api/admin/orders/${id}`);
        const orderData = orderResponse.data;
        setOrder(orderData);
        setEditOrderData({ status: orderData.status });

        // 회원 정보를 가져옴
        const memberResponse = await axios.get(`${apiUrl}/api/members/${orderData.memberId}`);
        const memberData = memberResponse.data;
        setMember(memberData);

        // 주문 상태를 가져옴
        const statusesResponse = await axios.get(`${apiUrl}/api/order-statuses`);
        const statuses = statusesResponse.data;
        setOrderStatuses(statuses);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setEditOrderData(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSaveClick = () => {
    axios.put(`http://1.226.84.83:8080/api/admin/orders/${id}/status`, { status: editOrderData.status })
      .then(() => {
        alert('주문 정보가 성공적으로 업데이트되었습니다.');
        navigate('/admin/order/list');
      })
      .catch(error => {
        console.error('주문 정보를 업데이트하는 중 오류가 발생했습니다:', error);
        alert('주문 정보를 업데이트하는 중 오류가 발생했습니다.');
      });
  };

  const handleCancelClick = () => {
    navigate('/admin/order/list');
  };

  // 가격을 콤마 형식으로 변환하고 '원'을 붙이는 함수
  const formatPrice = (price) => {
    return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
  };

  if (!order || !member) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="order-edit-page-container">
      <h1 style={{ marginBottom: '20px' }}>주문 정보</h1>
      <div className="order-edit-page-form">
        <h2 style={{ marginBottom: '10px' }}>1. 주문자 정보</h2>
        <label>주문자 이름</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={member.memberName}
          disabled
        />
        <label>주문자 연락처</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={member.contact}
          disabled
        />
        <label>주문자 주소</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={member.address}
          disabled
        />

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>2. 수취인 정보</h2>
        <label>수취인 이름</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={order.recipientName}
          disabled
        />
        <label>수취인 연락처</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={order.contactNumber}
          disabled
        />
        <label>배송지</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={order.deliveryLocation}
          disabled
        />

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>3. 상품 정보</h2>
        <table className="order-edit-page-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>4. 주문 상품 총가격</h2>
        <input
          type="text"
          className="order-edit-page-input"
          value={formatPrice(order.totalPrice)}
          disabled
        />

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>5. 관리</h2>
        <label>요청사항</label>
        <input
          type="text"
          className="order-edit-page-input"
          value={order.request}
          disabled
        />

        <label>배송상태</label>
        <select
          className="order-edit-page-select"
          value={editOrderData.status}
          onChange={(e) => handleInputChange(e, 'status')}
        >
          {orderStatuses.map((status, index) => (
            <option key={index} value={status.status}>{status.displayName}</option>
          ))}
        </select>

        <div className="order-edit-page-buttons">
          <button onClick={handleSaveClick} className="order-edit-page-button">저장</button>
          <button onClick={handleCancelClick} className="order-edit-page-button">취소</button>
        </div>

      </div>
    </div>
  );
}

export default OrderEditPage;
