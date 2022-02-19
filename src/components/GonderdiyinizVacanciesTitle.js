import React from 'react'
import '../assets/css/gonderdiyinizVacancies.css'
import eye from '../assets/image/eye.png';
import deleteI from '../assets/image/delete.png';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function GonderdiyinizVacanciesTitle(props) {
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [RequestData, setRequestData] = useState([])
    
    useEffect(() => {
        axios.get(`https://jobday.az/api/vacancies/14` , headers)
             .then(res =>( setRequestData(res.data.data) )) 
    },[])




    return (
        <div className="GonderdiyinizVacancies">
            <p>{props.id}</p>
            <p>{props.vacancy}</p>
            <p>{props.type}</p>
            <p>{props.companyName}</p>
            <p>{props.date}</p>
            <div className="btnCont">
                <button><img src={eye} alt=""/></button>
                <button><img src={deleteI} alt=""/></button>
            </div>
        </div>
    )
}

export default GonderdiyinizVacanciesTitle
