import React from 'react';
import Searchbar from '../components/searchbar';
import backImg from "../assets/images/left-arrow.png";
import { useNavigate } from "react-router-dom";


export default function Searchscreen() {
    const navigate = useNavigate();
    return (
        <div className='parentsearch'>
            <div className="headersearch">
                <div className='back_arrow' onClick={() => navigate(-1)}>
                    <img src={backImg} />

                </div>
                <div className='search_area'>
                    <Searchbar placeholder='search  for company or stocks ' isSetting={true} backgroundcolor='#EEEEEE' />
                </div>
            </div>
            <div className="bodycontainer">
                <div className='no_SearchData'>
                    <p className='search_label_stock'>Search one or more keywords</p>
                </div>
            </div>


        </div>
    )
}
