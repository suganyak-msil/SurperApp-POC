import React, { useEffect, useState } from 'react'
import { stockData, watchlistNames } from '../assets/stocksData'
import searchImg from "../assets/images/search.png";
import filterImg from "../assets/images/setting.png";
import { sendGetGroupsRequest, getWatchListData } from "../utils/device-interface";
import { useSelector, useDispatch } from 'react-redux';
import WatchListReducer from '../reducers/watchListReducer';
import { getsymbols, storewatchlist } from '../actions/watchlistAction';
console.log("watchlistNames", watchlistNames);

export default function WatchList() {
    const [stockList, setStockList] = useState(stockData)
    const [watchListNames, setWatchListNames] = useState([])
    const [deviceType, setDeviceType] = useState("");

    const dispatch = useDispatch();

    const watchListGroup = useSelector(state => state.WatchListReducer);
    console.log('watchListGroup  Reducer store', watchListGroup);


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

        sendGetGroupsRequest()
        let Grpresponse = window ?? window.getGroupsResponse();
        console.log('response from device ', Grpresponse);
        if (Grpresponse !== null && Grpresponse.data !== null) {
            dispatch(getsymbols(Grpresponse.data))
            let watchListNamesGroup = Grpresponse.data;
            let req = {
                "wId": watchListNamesGroup[0].wName
            }
            getWatchListData(req);
            let watchListRespone = window ?? window.getwatchListResponse();
            console.log("Respoinse from Device ", watchListRespone);
            if (watchListRespone !== null && watchListRespone.data !== null) {
                dispatch(storewatchlist(watchListRespone));

            }
            else {
                console.error('errror ', watchListRespone)
            }

        }
        else {
            console.error('Invalid data ', Grpresponse)
        }
    }, [])






    const handleWatchListClick = (item) => {
        console.log("item", item);
        let req = {
            "wId": item.name
        }
        getWatchListData(req);
        let watchListRespone = window ?? window.getwatchListResponse();
        console.log("Respoinse from Device ", watchListRespone);
        if (watchListRespone !== null && watchListRespone.data !== null) {
            dispatch(storewatchlist(watchListRespone.data.symbols));

        }

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
                <img className='filter_icon' alt="filter" src={filterImg} />
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
