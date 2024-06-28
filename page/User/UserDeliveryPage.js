import React from 'react'
import Header from '../../Componunts/js/Header'
import Delivery from '../../Componunts/js/Delivery'
import {Userinfosubmenu} from '../../Componunts/js/Userinfosubmenu'
import '../../Componunts/css/Deliverypage.css'

export const UserDeliveryPage = () => {
    return (
            <div className='Delivery-page'>
                <div className='user-info-section1'>
                    <Header />
                </div>
                <div className='Delivery-section2'>
                    <Userinfosubmenu />
                    <Delivery />
                </div>

            </div>
    )
}
