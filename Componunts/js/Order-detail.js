import React, { useEffect, useState } from 'react';
import '../css/Order-detail.css'; // CSS 파일 import
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetail = () => {
  
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://1.226.84.83:8080/api/order/${id}`, {
          headers: { Authorization: token }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const { member, recipientName, contactNumber, deliveryLocation, createDate, request, totalPrice, orderItems } = order;

  // 최종 결제 금액 계산 (상품 가격 - 할인 금액 + 배송비)
  // order.payment.lasttotal = order.payment.total - order.payment.discount + order.payment.delivery;

  return (
    <div className="order-detail-container">
      {/* 주문자 정보 섹션 */}
      <section className="order-section">
        <h2 className="section-title">주문자 정보</h2>
        <div className="order-info">
          <div><strong>이름:</strong> {member?.memberName || '정보 없음'}</div>
          <div><strong>전화번호:</strong> {member?.contact || '정보 없음'}</div>
          <div><strong>이메일:</strong> {member?.email || '정보 없음'}</div>
        </div>
      </section>

      {/* 받는 사람 정보 섹션 */}
      <section className="order-section">
        <h2 className="section-title">받는 사람 정보</h2>
        <div className="order-info">
          <div><strong>이름:</strong> {recipientName}</div>
          <div><strong>전화번호:</strong> {contactNumber}</div>
          <div><strong>주소:</strong> {deliveryLocation}</div>
        </div>
      </section>

      {/* 결제 정보 섹션 */}
      <section className="order-section">
        <h2 className="section-title">결제 정보</h2>
        <div className="order-info">
          <div><strong>주문 날짜:</strong> {new Date(createDate).toLocaleDateString()}</div>
          <div><strong>총 상품가격:</strong> {totalPrice}원</div>
          <div><strong>요청사항:</strong> {request}</div>
        </div>
      </section>

      {/* 주문 항목 정보 섹션 */}
      <section className="order-section">
        <h2 className="section-title">주문 항목</h2>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index} className="order-item">
              <img src={item.imageUrl} alt={item.productName} className="item-image" />
              <div className="item-info">
                <span className="item-name">{item.productName}</span>
                <span className="item-quantity">{item.quantity}개</span>
                <span className="item-price">{item.price}원</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OrderDetail;
