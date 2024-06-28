import React from 'react'
import Header from '../../Componunts/js/Header'
import Goods from '../../Componunts/js/Goods'
import SearchRequest from '../../Componunts/js/SearchRequest'

const SearchPage2 = () => {
    return (
        <div className='App'>
            <div className='searchpage-header'>
                <Header />
            </div>
            <div className='searchpage-main'>
                <SearchRequest />
            </div>
        </div>
    )
}

export default SearchPage2