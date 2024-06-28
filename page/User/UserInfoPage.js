import React from 'react'
import { Userinfosubmenu } from '../../Componunts/js/Userinfosubmenu'
import { MyPage } from '../../Componunts/js/MyPage'
import '../../Componunts/css/Info.css'
import Header from '../../Componunts/js/Header'
import './UserInfo.css' 

export const UserInfoPage = () => {
    return (
        <div className='user-info-page'>
            <div className='user-info-section1'>
                <Header />
            </div>
            <div className='user-info-section2'>
                <Userinfosubmenu />
                <MyPage />
            </div>
        </div>
    )
}
