import React, { useEffect, useState } from 'react';
import '../css/Request.css'; // CSS 파일 import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentRequest = () => {
  const [buyer, setBuyer] = useState({ name: '', phone: '', email: '' });
  const [recipient, setRecipient] = useState({ name: '', phone: '', address: '' });
  const [addresses, setAddresses] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [shippingRequest, setShippingRequest] = useState('');
  const [payment, setPayment] = useState({ total: 0, discount: 0, delivery: 2500, lastTotal: 0 });
  const [availablePoints, setAvailablePoints] = useState(1000);
  const [usedPoints, setUsedPoints] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 토큰이 올바르게 생성된 후에 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchBuyerInfo = async () => {
        try {
          const response = await axios.get('http://1.226.84.83:8080/api/mypage', {
            headers: { Authorization: token }
          });
          setBuyer(response.data);
        } catch (error) {
          console.error('Error fetching buyer info:', error);
        }
      };

      const fetchAddresses = async () => {
        try {
          const response = await axios.get('http://1.226.84.83:8080/api/addresses/list', {
            headers: { Authorization: token }
          });
          setAddresses(response.data);
          const defaultAddress = response.data.find(addr => addr.id === 1);
          if (defaultAddress) {
            setRecipient({
              name: defaultAddress.recipientName,
              phone: defaultAddress.contactNumber,
              address: defaultAddress.deliveryLocation
            });
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

      const loadSelectedItems = () => {
        const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
        console.log('Loaded selected items:', selectedItems); // 디버깅용 로그
        if (selectedItems) {
          setOrderItems(selectedItems);
          const total = selectedItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
          setPayment(prevPayment => ({ ...prevPayment, total, lastTotal: total + prevPayment.delivery }));
        }
      };

      fetchBuyerInfo();
      fetchAddresses();
      loadSelectedItems();
    }
  }, []);

  // 페이지 언로드 시 로컬 스토리지 데이터 삭제
  useEffect(() => {
    const handleUnload = () => {
      console.log('Removing selected items from localStorage'); // 디버깅용 로그
      localStorage.removeItem('selectedItems'); // 로컬 스토리지에서 아이템 삭제
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const handleAddressChange = (addressId) => {
    const selectedAddress = addresses.find(addr => addr.id === addressId);
    if (selectedAddress) {
      setRecipient({
        name: selectedAddress.recipientName,
        phone: selectedAddress.contactNumber,
        address: selectedAddress.deliveryLocation
      });
    }
  };

  const handlePointsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= availablePoints) {
      setUsedPoints(value);
    } else {
      setUsedPoints(availablePoints);
    }
  };

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    const orderDto = {
      recipientName: recipient.name,
      contactNumber: recipient.phone,
      deliveryLocation: recipient.address,
      request: shippingRequest,
      orderItems: orderItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      totalPrice: payment.lastTotal - usedPoints
    };

    try {
      const response = await axios.post('http://1.226.84.83:8080/api/paypal/createPayment', orderDto, {
        headers: { 'Authorization': token }
      });
      const approvalUrl = response.data.approvalUrl;
      console.log('Payment initiated, approval URL:', approvalUrl); // 디버깅용 로그
      localStorage.removeItem('selectedItems'); // 결제 완료 시 로컬 스토리지에서 아이템 삭제
      window.location.href = approvalUrl;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    const tempOrderId = params.get('tempOrderId');
    const token = localStorage.getItem('token');

    if (paymentId && payerId && tempOrderId) {
      axios.get(`http://1.226.84.83:8080/api/paypal/success?paymentId=${paymentId}&PayerID=${payerId}&tempOrderId=${tempOrderId}`, {
        headers: { 'Authorization': token }
      })
      .then(response => {
        console.log('Payment successful:', response.data); // 디버깅용 로그
        navigate('/main');
      })
      .catch(error => {
        console.error('Error capturing payment:', error);
        navigate('/mypage');
      });
    }
  }, [navigate]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

return (
  <div className="payment-request-container">
    <section className="order-section">
      <h2 className="section-title">구매자 정보</h2>
      <table className="info-table">
        <tbody>
          <tr>
            <th>이름</th>
            <td>{buyer.memberName}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{buyer.contact}</td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>{buyer.email}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section className="order-section">
      <h2 className="section-title">받는사람 정보</h2>
      <table className="info-table">
        <tbody>
          <tr>
            <th>이름</th>
            <td>{recipient.name}</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td>{recipient.phone}</td>
          </tr>
          <tr>
            <th>주소</th>
            <td>{recipient.address}</td>
          </tr>
          <tr>
            <th>배송 요청 사항</th>
            <td>
              <select
                value={shippingRequest}
                onChange={(e) => setShippingRequest(e.target.value)}
                className="shipping-select"
              >
                <option value="">직접 입력 혹은 선택</option>
                <option value="문앞에 놔주세요">문앞에 놔주세요</option>
                <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                <option value="배송 전에 전화주세요">배송 전에 전화주세요</option>
                <option value="직접 작성">직접 작성</option>
              </select>
              {shippingRequest === '직접 작성' && (
                <input
                  type="text"
                  placeholder="직접 입력하세요"
                  value={shippingRequest}
                  onChange={(e) => setShippingRequest(e.target.value)}
                  className="shipping-input"
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={openModal} className="change-address-button">주소 변경</button>
    </section>

    <section className="order-section">
      <h2 className="section-title">상품 정보</h2>
      <table className="info-table product-info">
        <tbody>
          {orderItems.map((item, index) => (
            <tr key={index}>
              <td className="product-name">{item.product.productName}</td>
              <td className="product-quantity">{item.quantity}개</td>
              <td className="product-price">{item.product.price.toLocaleString()}원</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    <section className="order-section">
      <h2 className="section-title">결제 정보</h2>
      <table className="info-table">
        <tbody>
          <tr>
            <th>총 상품가격</th>
            <td>{payment.total.toLocaleString()}원</td>
          </tr>
          <tr>
            <th>할인 쿠폰</th>
            <td>{payment.discount.toLocaleString()}원</td>
          </tr>
          <tr>
            <th>배송비</th>
            <td>{payment.delivery.toLocaleString()}원</td>
          </tr>
          <tr>


            <th>적용 포인트</th>
            <td>
              <span>보유 포인트: {availablePoints.toLocaleString()}원</span><br />
              <input
                type="number"
                value={usedPoints}
                onChange={handlePointsChange}
                className="points-input"
              />
            </td>
          </tr>
          <tr>
            <th>총 결제금액</th>
            <td>{(payment.total - payment.discount + payment.delivery - usedPoints).toLocaleString()}원</td>
          </tr>
          <tr>
            <th>결제 방법</th>
            <td>
              <label>
                <input
                  type="radio"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                신용/체크카드
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="pgPayment"
                  checked={paymentMethod === 'pgPayment'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PG 간편결제
              </label>
            </td>
          </tr>
          <tr>
            <td colSpan="2" className="payment-button-container">
              <button className="payment-button" onClick={handlePayment}>결제하기</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={closeModal}>&times;</span>
          <h2>주소 선택</h2>
          <ul>
            {addresses.map(address => (
              <li key={address.id} onClick={() => handleAddressChange(address.id)}>
                {address.recipientName} - {address.contactNumber} - {address.deliveryLocation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
);
};



export default PaymentRequest;
