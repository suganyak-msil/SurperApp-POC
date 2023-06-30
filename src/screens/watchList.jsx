import React, { useEffect, useState } from 'react';
import { stockData, watchlistNames } from '../assets/stocksData'
import AddImg from "../assets/images/add_w.png";
import EditImg from "../assets/images/edit_w.png";
import ManageImg from "../assets/images/manage_w.png";
import MoreImg from "../assets/images/more.png";
import { sendGetGroupsRequest, getWatchListData } from "../utils/device-interface";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import WatchListReducer from '../reducers/watchListReducer';
import { getsymbols, storewatchlist } from '../actions/watchlistAction';
import Searchbar from '../components/searchbar';
console.log("watchlistNames", watchlistNames);

export default function WatchList() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [stockList, setStockList] = useState(stockData)
    const [watchListNames, setWatchListNames] = useState([])
    const [msg, setMsg] = useState('');
    console.log('Message from api', msg);
    const [deviceType, setDeviceType] = useState("");
    const [modalOpen, setMOdalOpen] = useState('modal fade');
    const [createWatchListOpen, setCreateWatchListOpen] = useState('modal fade')
    console.log('modalOpen', modalOpen);


    const watchListGroup = useSelector(state => state.WatchListReducer);
    const watchListNamesGroup = watchListGroup.watchListSymbolsGroup
    console.log('watchListGroup  Reducer store',
    );


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

        // sendGetGroupsRequest()
        // let Grpresponse = window ?? window.getGroupsResponse();
        // console.log('response from device on load  ', Grpresponse);
        // let existingList = [...watchListNames];

        // if (!Grpresponse) {
        //     setMsg('Invalid Data ')
        //     existingList[0] = {
        //         name: 'Invalid Data',
        //         id: '123',
        //     }
        // }
        // else {
        //     setMsg(Grpresponse)
        //     let existingList = [...watchListNames];
        //     existingList[0] = {
        //         name: Grpresponse,
        //         id: '123',
        //     }

        // }
        // console.log("existingList        ", existingList);

        // setWatchListNames(existingList)

        // if (Grpresponse !== null && Grpresponse.data !== null) {
        //     dispatch(getsymbols(Grpresponse.data.watchlists))
        //     let watchListNamesGroup = Grpresponse.data.watchlists;
        //     let req = {
        //         "wId": watchListNamesGroup[0].wName
        //     }
        //     // getWatchListData(req);
        //     // let watchListRespone = window ?? window.getwatchListResponse();
        //     // console.log("Respoinse from Device ", watchListRespone);
        //     // if (watchListRespone !== null && watchListRespone.data !== null) {
        //     //     dispatch(storewatchlist(watchListRespone));

        //     // }
        //     // else {
        //     //     console.error('errror ', watchListRespone)
        //     // }

        // }
        // else {
        //     console.error('Invalid data ', Grpresponse)
        // }
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
    const handleOpenModal = () => {
        setMOdalOpen('modal fade show')
        console.log('handleClick open modal 11');
    }
    const handleCreateWatchList = () => {
        setMOdalOpen('modal fade ');
        setCreateWatchListOpen('modal fade show')

    }
    const addNewWatchList = () => {
        setCreateWatchListOpen('modal fade')

    }
    const handlechange = () => {

    }
    return (
        <div>
            <p className='watchList_Banner'>watchList Component</p>
            <ul className='watclistNames_container'>
                {watchlistNames && watchlistNames.length > 0 && watchlistNames.map((item) => {
                    return <li onClick={() => handleWatchListClick(item)}>{item.name}</li>
                })}
            </ul>
            <div className='watchList_header'>

                <Searchbar isSetting={false} placeholder=' stocks, future  & Options' handleSettings={handleOpenModal} isRoute={'search'} />
                <div className='more_Icon'>
                    <img src={MoreImg} onClick={handleOpenModal} />
                </div>
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
                {/* modal popup */}

                {/* open on click more icon  */}
                <div class={modalOpen} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: modalOpen === 'modal fade show' ? 'block' : '' }}>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div className='list_item'>
                                    <div className='w_icons'>
                                        <img src={AddImg} />
                                    </div>
                                    <div className='action_name' onClick={handleCreateWatchList}>
                                        <p>Create New WatchList</p>
                                    </div>
                                </div>
                                <div className='list_item'>
                                    <div className='w_icons'>
                                        <img src={EditImg} />

                                    </div>
                                    <div className='action_name' onClick={() => navigate('editwatchList')}>
                                        <p>Edit Current WatchList</p>
                                    </div>
                                </div>
                                <div className='list_item' >
                                    <div className='w_icons'>
                                        <img src={ManageImg} />
                                    </div>
                                    <div className='action_name' onClick={() => navigate('manage')}>
                                        <p>Manage WatchList</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* create watchlist */}
                <div class={createWatchListOpen} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: createWatchListOpen === 'modal fade show' ? 'block' : '' }}>
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <p>Create WatchList</p>
                            </div>
                            <div class="modal-body">
                                <p>List Name </p>
                                <input type='text' className='create_watchList' name='watchListName' onChange={handlechange} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary btn-lg btn-block" onClick={addNewWatchList}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
