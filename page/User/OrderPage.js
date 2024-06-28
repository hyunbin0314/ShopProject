import React from 'react'
import Header from '../../Componunts/js/Header'
import PaymentRequest from '../../Componunts/js/Request'

export const OrderPage = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='main-section1'>
                <PaymentRequest />
            </div>
        </div>
    )
}
