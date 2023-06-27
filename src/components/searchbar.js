import React from 'react'
import filterImg from "../assets/images/setting.png";
import searchImg from "../assets/images/search.png";
import { useNavigate } from "react-router-dom";
// import 
export default function Searchbar(props) {
    const navigate = useNavigate();
    console.log(props);
    const handleOpenModal = () => {
        props.handleSettings();
        console.log('handleClick open modal');
    }
    function handleNav() {
        console.log("isnide habdleNav");
        if (props.isRoute) {
            navigate('/search')
        }
    }
    return (

        <div className='search-area' >
            <img className='search_icon' src={searchImg} alt='search-img' />
            <input className='search-input' type='text' style={{ backgroundColor: props.backgroundcolor ? props.backgroundcolor : '', color: props.backgroundColor ? 'white' : '' }}
                placeholder={props.placeholder ? props.placeholder : ''}
                onClick={handleNav} />
            {/* {props.isSetting ? <img className='filter_icon' alt="filter" src={filterImg} onClick={handleOpenModal} /> : ''} */}
        </div>
    )
}
