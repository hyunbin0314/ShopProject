import React from 'react'
import { Userinfosubmenu } from '../../Componunts/js/Userinfosubmenu'
import MemberOrder from '../../Componunts/js/MemberOrder'
import Header from '../../Componunts/js/Header'

export const OrderListPage = () => {
    return (
        <div className='user-info-page'>
            <div className='user-info-section1'>
                <Header />
            </div>
            <div className='user-info-section2'>
            <Userinfosubmenu />
            <MemberOrder />
            </div>
        </div>
    )
}
