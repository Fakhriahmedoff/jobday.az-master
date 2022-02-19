import React, { useEffect, useState } from 'react'
import "../assets/css/thanksPage2.css"
import SearchBox from '../components/SearchBox'
import {Link} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import itemImg1 from '../assets/image/aboutImg1.png'
import itemImg2 from '../assets/image/aboutImg2.png'
import itemImg3 from '../assets/image/aboutImg3.png'
import instagram from '../assets/image/instagram.png'
import facebook from '../assets/image/facebook.png'
import whatsapp from '../assets/image/whatsapp.png'
import jobdayLogo from '../assets/image/jobdayLogo.png'
import { useMediaQuery } from '@material-ui/core';
import Button from '../components/Button';
import Data from '../assets/language/ThanksPage.json'
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';


function ThanksPage3() {
    const mobileMQ = useMediaQuery('(min-width:900px)');
    const lang = Data[`thanks-${sessionStorage.getItem('lang')}`]
    

    return (
        <div className="ThanksPage2">
            <div className="ThanksCont">
                <div className='billAndText'>
                    <p className="billImg"><HowToRegIcon/></p>
                    <p className="billAbout">{lang?.text_cv3}</p>
                    {/* <div className="bill" id='bill'>
                            <img src={jobdayLogo} width='107px' height='auto'/>
                            <h2 className="title">{lang?.title}</h2>
                            <div className='elements'>
                                <div className="element"><p className='text colorchange'> {lang?.name} </p>  <p className='text'>{JSON.parse(localStorage.getItem('LoginUserData'))?.user_type === "jobseeker" ?  (JSON.parse(localStorage.getItem('LoginUserData'))?.name + " " + JSON.parse(localStorage.getItem('LoginUserData'))?.surname) : JSON.parse(localStorage.getItem('LoginUserData'))?.name}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.reason} </p>  <p className='text'>{localStorage?.getItem('reason')?.slice(0,7) === 'premium' && (lang?.premium)} {localStorage?.getItem('reason')?.slice(0,7) === 'premium' ? (localStorage.getItem('type') === 'vacancy' && (lang?.vacancy_down)) : (localStorage.getItem('type') === 'vacancy' && (lang?.vacancy_capt)) } {localStorage?.getItem('reason')?.slice(0,7) === 'premium' ? (localStorage.getItem('type') === 'cv' && "CV") : (localStorage.getItem('type') === 'cv' && "CV") }  {lang?.placement}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.date}  </p>  <p className='text'>{now}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.bill}  </p>  <p className='text'>{qebz}</p></div>
                            </div>
                            <div className="price">
                                <p className="text colorchange priceText">{lang?.price} </p>
                                <p className="text priceItself">{localStorage.getItem('amount')} ₼</p>
                            </div>
                    </div> */}
                    <div className="buttonCont">
                        <Link to={`/jobseeker-area/`}><button className='billBtn'> <ArrowBackIcon/> {lang?.backto}</button></Link>
                        {/* <button className='billBtn' onClick={() => sendEmail()} > <EmailIcon/> {lang?.sendEmail}</button> */}
                        {/* <button className='billBtn' type='submit' onClick={() => printBill()}> <PrintIcon/> {lang?.print}</button> */}
                        <a href={`https://jobday.az/`}><button className='billBtn'> <HomeIcon/> {lang?.homePage}</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThanksPage3
