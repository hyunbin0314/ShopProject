import React, { useEffect, useState } from 'react';
import '../css/MemberOrder.css';

// 이미지 경로 가져오기
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const MemberOrder = () => {
  
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://1.226.84.83:8080/api/order/list', {
          headers: { 'Authorization': token }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrderDetail = (orderId) => {
    navigate(`/order/detail/${orderId}`);
  };

  return (
    <section className="Order-order-check">
  <h2 className="Order-heading">주문 목록</h2>
  {orders.length === 0 ? (
    <p>주문이 없습니다.</p>
  ) : (
    orders.map(order => (
      <div key={order.id} className="Order-order">
        <div className="Order-order-header">
          <span>{order.status}</span>
          <span>{new Date(order.createDate).toLocaleDateString()}</span>
          <button className="Order-view-detail-button" onClick={() => handleViewOrderDetail(order.id)}>주문 상세보기</button>
        </div>
        <ul>
          {order.orderItems && order.orderItems.map((item, index) => (
            <li key={index} className="Order-order-item">
              <img src={item.imageUrl} alt={item.productName} className="Order-item-image" />
              <div className="Order-item-info">
                <span className="Order-item-name">{item.productName}</span>
                <span className="Order-item-quantity">{item.quantity}개</span>
                <span className="Order-item-price">{item.price}원</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))
  )}
</section>
  );
};

export default MemberOrder;
