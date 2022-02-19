import React, { useEffect, useState } from 'react'
import mainLogo from '../assets/image/jobday 1.svg'
import x from '../assets/image/x.png'
import {Link} from 'react-router-dom'
import "../assets/css/registration.css"
import Button from './Button'
import CompanyReg from './CompanyReg'
import UserReg from './UserReg'
import axios from 'axios'
import Cookies from 'js-cookie';

function Registration(props) {
    const [mainChecker, setmainChecker] = useState(1)
        
    const clickMainHandler = (num) => {
        if (num === 1)
        {
            document.getElementById(`mainBtn${num}`).setAttribute('style', "border-top: 3px solid #3D92A7;background-color: transparent;" )
            document.getElementById(`mainBtn${num + 1}`).setAttribute('style', "border-bottom: 3px solid #3D92A7;")
            setmainChecker(num)
        }
        else 
        {
            document.getElementById(`mainBtn${num}`).setAttribute('style', "border-top: 3px solid #3D92A7;background-color: transparent;border-bottom:3px solid transparent;")
            document.getElementById(`mainBtn${num-1}`).setAttribute('style', "border-bottom: 3px solid #3D92A7;border-top:3px solid transparent;background-color:white;" )
            setmainChecker(num)
        }
    }

    
    return (
        <div className="registrationCont">
            <div className="formsCont">
                <Link to="/" className="closeImgLink"><button onClick={() => props.close()}><img className="closeImg" src={x} alt="" width="19" height="auto" /></button></Link>
                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Qeydiyyat` || sessionStorage.getItem('lang') === "EN" && `Registration` || sessionStorage.getItem('lang') === "RU" && `Регистрация`}</p>
                <div className="formCont">
                    <div className="buttonCont">
                        <button id="mainBtn1" type="button" className="buttons" onClick={() => clickMainHandler(1)}>{sessionStorage.getItem('lang') === "AZ" && `İş axtaran` || sessionStorage.getItem('lang') === "EN" && `Job seeker` || sessionStorage.getItem('lang') === "RU" && `Ищущий работу`}</button>
                        <button id="mainBtn2" type="button" className="buttons" onClick={() => clickMainHandler(2)}>{sessionStorage.getItem('lang') === "AZ" && `Şirkət` || sessionStorage.getItem('lang') === "EN" && `Company` || sessionStorage.getItem('lang') === "RU" && `Компания`}</button>
                    </div>
                    {mainChecker === 1 ? <UserReg/> :  <CompanyReg />}
                    
                </div>
            </div>

        </div>
    )
}

export default Registration
