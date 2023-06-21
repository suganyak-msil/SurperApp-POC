import React, { useEffect, useState } from 'react'
import { stockData, watchlistNames } from '../assets/stocksData'
import searchImg from "../assets/images/search.png";
import filterImg from "../assets/images/setting.png";
import { deviceCallback } from "../components/common";
console.log("watchlistNames", watchlistNames);

export default function WatchList() {
    const [stockList, setStockList] = useState([])
    const [watchListNames, setWatchListNames] = useState([])
    const [deviceType, setDeviceType] = useState("");
    // device detect 
    useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent
            )
        ) {
            /iPad|iPhone|iPod/.test(navigator.userAgent) ?
                setDeviceType("ios") : setDeviceType('Android')
            setWatchListNames(watchlistNames);
        } else {
            setDeviceType("Desktop");
        }
    }, []);

    useEffect(() => {
        if (deviceType === 'ios' || deviceType === 'android') {
            // watchlist count  
            deviceCallback(sendGetGroupsRequest, "")
        }
    }, [])

    const sendGetGroupsRequest = () => {
        setStockList(stockData)
    }
    const watchList_items = () => {
        console.log("watchList items Data");
    }
    const handleWatchListClick = (item) => {
        console.log("item", item);
        let req = {
            wid: item.id
        }
        // window.webkit.messageHandlers.MyHandler.postMessage(req);
        deviceCallback(watchList_items, req)
    }
    return (
        <div>
            <p className='watchList_header'>watchList Component</p>
            <ul className='watclistNames_container'>
                {watchListNames && watchListNames.map((item) => {
                    return <li onClick={() => handleWatchListClick(item)}>{item.name}</li>
                })}
            </ul>

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
