import React from 'react'
import '../../Componunts/css/AdminMain.css'
import { Link, useNavigate } from 'react-router-dom'

export const AdminMain = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='admin-main-container'>
      <Link to={'/admin/member/list'}>
      <div className='admin-main-item'>

        회원 관리

      </div>
      </Link>
      <Link to={'/admin/order/list'}>
      <div className='admin-main-item'>

        주문 관리

      </div>
      </Link>
      <Link to={'/admin/product/list'}>
        <div className='admin-main-item'>
          상품 관리
        </div>
      </Link>


      <div className='admin-main-item' onClick={handleLogout}>
        로그아웃
      </div>
    </div>

  )
}
