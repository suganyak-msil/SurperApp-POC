import React, { useEffect, useState } from 'react'
import { stockData } from '../assets/stocksData'
import searchImg from "../assets/images/search.png";
import filterImg from "../assets/images/setting.png";

export default function WatchList() {
    const [stockList, setStockList] = useState([])
    console.log('stockList ', stockList);
    useEffect(() => {
        handleIntialStockData()
    }, [])
    const handleIntialStockData = () => {
        setStockList(stockData)
    }
    return (
        <div>
            <p className='watchList_header'>watchList Component</p>
            <div className='search-area'>
                <img className='search_icon' src={searchImg} alt='search-img' />
                <input className='search-input' type='text' placeholder='stocks, future  & Options ' />
                <img className='filter_icon' src={filterImg} />
            </div>

            <div className='watchListComponent'>
                {stockList.map((item) => {
                    return <div className='watchlist-item'>
                        <div className='watchlist-row'>
                            <div className='watchlist_data_left' >

                                <p style={{ fontWeight: 'bold' }}>{item.companyName}</p>
                            </div>
                            <div className='watchlist_data_right'>
                                <p >{item.sym.excToken}</p>
                            </div>
                        </div>
                        <div className='watchlist-row'>
                            <div className='watchlist_data_left'>
                                <p>{item.sym.exc}</p>
                            </div>
                            <div className='watchlist_data_right'>
                                <p>{item.sym.tickSize}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
