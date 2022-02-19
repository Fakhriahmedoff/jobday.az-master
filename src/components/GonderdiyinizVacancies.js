import React from 'react'
import '../assets/css/gonderdiyinizVacancies.css'
import eye from '../assets/image/eye.png';
import deleteI from '../assets/image/delete.png';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom';

function GonderdiyinizVacancies(props) {
    


    return (
        <div className="GonderdiyinizVacancies">
            <p>{props.id}</p>
            <p className='titleVacancy'>{props.vacancy}</p>
            <p>{props.type}</p>
            <p>{props.companyName}</p>
            <p>{props.date}</p>
            <div className="btnCont">
                <Link  to={`https://jobday.az/single-vacancy/${props.id}`} className="eyeButton"> <img src={eye} alt=""/></Link>
            </div>
        </div>
    )
}

export default GonderdiyinizVacancies



