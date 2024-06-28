import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('paymentId');
    const payerId = params.get('PayerID');
    const token = localStorage.getItem('token');

    if (paymentId && payerId) {
      axios.get(`http://1.226.84.83:8080/api/paypal/success?paymentId=${paymentId}&PayerID=${payerId}`, {
        headers: { 'Authorization': token }
      })
        .then(response => {
          navigate('/main');
        })
        .catch(error => {
          console.error('Error capturing payment:', error);
          navigate('/mypage');
        });
    } else {
      navigate('/mypage');
    }
  }, [navigate]);

  return (
    <div>
      결제 처리 중...
    </div>
  );
};

export default PaymentSuccess;