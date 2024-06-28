import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/3.png';

const FindIdComponent = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFindId = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/findid', { email });
      alert(response.data);
      navigate('/')
    } catch (error) {
      console.error('Error occurred:', error);
      setMessage('Failed to find ID');
    }
  };

  return (
    <div className='login-wrapper'>
      <div className='login-container'  style={{height:'300px'}}>
        <img src={Logo} alt="Logo" className="member-logo" />
        <h3>아이디 찾기</h3>
        <div className='login-form-group'>

          <input
            type="text"
            placeholder="이메일을 입력하세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleFindId}>메일요청</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FindIdComponent;
