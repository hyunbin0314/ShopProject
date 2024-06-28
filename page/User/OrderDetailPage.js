import React from 'react'
import Header from '../../Componunts/js/Header'
import OrderDetail from '../../Componunts/js/Order-detail'
export const OrderDetailPage = () => {
  return (
    <div className='App'>
        <div>
            <Header/>
        </div>
        <div>
            <OrderDetail/>
        </div>

    </div>
  )
}
