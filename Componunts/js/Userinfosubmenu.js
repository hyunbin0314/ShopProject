import React from 'react'
import '../css/Info.css'
import { Link } from 'react-router-dom'

export const Userinfosubmenu = () => {
    return (
        <div>
            <div className="info-left-container">
                <h3>내 정보</h3>
                <ul>
                    <Link to={'/mypage'}><li>내 정보 보기</li></Link>
                    <Link to={'/orderlist'}><li>주문내역 확인</li></Link>
                    <Link to={'/Delivery'}><li>배송지 관리</li></Link>
                </ul>
            </div>
        </div>
    )
}
