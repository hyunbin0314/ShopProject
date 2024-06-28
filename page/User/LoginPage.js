import React, { useState } from 'react';
import '../../Componunts/css/Login.css';
import Logo from '../../assets/3.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({setUserType}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        memberId: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 폼 데이터:', formData);
        // 여기서 서버로 데이터 전송 등의 로직을 추가할 수 있습니다.

        axios.post('http://localhost:8080/api/login', formData)
            .then(Response => {
                console.log('로그인 성공:', Response.data)
                const token = Response.data;
                console.log('받은 토큰:', token); // 받은 토큰 로그 확인
                localStorage.setItem('token', token)
                console.log('저장된 토큰:', localStorage.getItem('token')); // 저장된 토큰 확인 로그

                axios.get('http://localhost:8080/api/user/type', {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => {
                        const memberType = response.data.memberType;
                        console.log('멤버 타입:', memberType); // 멤버 타입 로그 추가
                        setUserType(memberType);
                        if (memberType === 'ADMIN') { // ADMIN 타입 확인
                            navigate('/admin/dashboard');
                          } else if (memberType === 'USER') { // USER 타입 확인
                            navigate('/main');
                          } else {
                            console.log('Unknown member type:', memberType);
                            setError('알 수 없는 사용자 유형입니다.');
                          }
                    })
                    .catch(error => {
                        console.log('유저 타입 확인 오류:', error);
                        setError('유저 타입 확인에 실패 했습니다. 다시 시도해주세요.');
                    });

            })
            .catch(error => {
                console.log('로그인 오류:', error)
                setError('로그인에 실패 했습니다. 다시 시도해주세요.')
            })
    };

    return (
        <div class="login-wrapper">
            <div className="login-container">
                <img src={Logo} alt="Logo" className="login-logo" />
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <input
                            type="text"
                            id="memberId"
                            name="memberId"
                            value={formData.memberId}
                            onChange={handleChange}
                            placeholder="아이디를 입력하세요"
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력하세요"
                            required
                        />
                    </div>
                    <button type="submit" className='login-button'>로그인</button>

                    

                    <div className='buttons-div'>

                    <Link to={'/signup'}><button type="submit" className='signup-buttons'>회원가입</button></Link>
                    <Link to={'/findid'}><button className='signup-buttons'>아이디찾기</button></Link>
                    <Link to={'/findpassword'}><button className='signup-buttons'>비밀번호찾기</button></Link>

                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
