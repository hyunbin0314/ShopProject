import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/3.png';
import { useNavigate } from 'react-router-dom';

const FindPasswordComponent = () => {
  const [memberId, setMemberId] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleFindPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/findpassword', { memberId, email });
      alert(response.data);
      navigate('/')
    } catch (error) {
      console.error('Error occurred:', error);
      setMessage('Failed to find password');
    }
  };

  return (
    <div className='signup-wrap'>
      <div className='login-container'>
      <img src={Logo} alt="Logo" className="member-logo" />
      <h3>비밀번호 찾기</h3>
      <div className='login-form-group'>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
        />
      </div>
      <div className='login-form-group'>
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button onClick={handleFindPassword}>비밀번호 재설정</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FindPasswordComponent;
