import React from 'react'
import "../assets/css/aboutUsPage.css"
import SearchBox from '../components/SearchBox'
import {Link} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import itemImg1 from '../assets/image/aboutImg1.png'
import itemImg2 from '../assets/image/aboutImg2.png'
import itemImg3 from '../assets/image/aboutImg3.png'
import instagram from '../assets/image/instagram.png'
import facebook from '../assets/image/facebook.png'
import whatsapp from '../assets/image/whatsapp.png'
import { useMediaQuery } from '@material-ui/core';

function RefundPage() {
    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="aboutUsPage">
            <SearchBox/>
            <div className="aboutUsCont">
                { 
                mobileMQ &&
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/about">{sessionStorage.getItem('lang') === "AZ" && `Haqqımızda` || sessionStorage.getItem('lang') === "EN" && `About Us` || sessionStorage.getItem('lang') === "RU" && `О нас`} </Link> 
                    </p>
                }
                <div className="aboutText">
                { sessionStorage.getItem('lang') === "AZ" && <p className="title mainTitle">Geri Qaytarılma Şərtləri</p> }
                { sessionStorage.getItem('lang') === "EN" && <p className="title mainTitle">About Return</p> }
                { sessionStorage.getItem('lang') === "RU" && <p className="title mainTitle">О Возврате</p> }
                    <div className="text">
                        Ödənişlərin geri qaytarılma şərtləri:  Istifadəçi öz vakansiyasını və ya premium elanını saytda yerləşdirdiyi vaxtdan 3 saat ərzində vakansiyanın leğv olunmasini istədiyi halda ödəniş həmin istifadıçiyə geri qaytarılır.
                        İstifadəçilərin kart məlumatları Jobday.az saytında saxlanılmır.
                    </div>
                    
                    
                    <div className="gridCont">
                        {  !mobileMQ && <img src={itemImg1} alt=""/>}
                        {  !mobileMQ && <img src={itemImg2} alt=""/>}
                        {  !mobileMQ && <img src={itemImg3} alt=""/>}

                        <div className="item1 item">
                        {  mobileMQ && <img src={itemImg1} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Telefon` || sessionStorage.getItem('lang') === "EN" && `Phone` || sessionStorage.getItem('lang') === "RU" && `Телефон`}</p>
                                <p className='number'><a className="number" href="tel:+994 51 226 37 30">+994 51 226 37 30 </a></p>
                                {/* <p className="number">+994 50 500 50 50</p> */}
                            </div>
                        </div>
                        
                        <div className="item2 item">
                            {  mobileMQ && <img src={itemImg2} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Эл. адрес`}</p>
                                <p className="subTitle">Office@jobday.az</p>
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`}</p>
                                <p className="subTitle">Bakı</p>
                            </div>
                        </div>

                        
                        <div className="item3 item">
                            {  mobileMQ && <img src={itemImg3} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Sosial şəbəkələr` || sessionStorage.getItem('lang') === "EN" && `Social Media` || sessionStorage.getItem('lang') === "RU" && `Социальные сети`}</p>
                                <div className="flexCont">
                                    <a href="tel:+994 51 226 37 30"><img src={whatsapp} alt=""/> <p className="subTitle">+994 51 226 37 30</p></a>
                                    <a href="#"><img src={instagram} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                    <a href="#"><img src={facebook} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefundPage 
