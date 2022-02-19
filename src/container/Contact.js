import React from 'react'
import "../assets/css/contactPage.css"
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
function Contact() {
    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="contactPage">
            <SearchBox/>
            <div className="contactCont">
                {
                    mobileMQ && 
                    <p className="pageLink">
                        <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/contact">{sessionStorage.getItem('lang') === "AZ" && `Əlaqə` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Контакт`} </Link> 
                    </p>
                }
                <div className="aboutText">
                    <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Əlaqə` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Контакт`}</p>
                    <div className="gridCont">
                        <div className="item1 item">
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Telefon` || sessionStorage.getItem('lang') === "EN" && `Phone` || sessionStorage.getItem('lang') === "RU" && `Телефон`}</p>
                                <p className='number'><a className="number" href="tel:+994 51 226 37 30">+994 51 226 37 30 </a></p>
                                <p className="number"><a className="number" href="tel:+994 50 615 62 48">+994 50 615 62 48 </a></p>
                            </div>
                        </div>
                        <div className="item2 item">
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Эл. адрес`}</p>
                                <p className="subTitle"><a href="mailto:info@jobday.az"> info@jobday.az </a></p>
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`}</p>
                                <p className="subTitle">{sessionStorage.getItem('lang') === "AZ" && `Bakı` || sessionStorage.getItem('lang') === "EN" && `Baku` || sessionStorage.getItem('lang') === "RU" && `Баку`}</p>
                            </div>
                        </div>
                        <div className="item3 item">
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Sosial şəbəkələr` || sessionStorage.getItem('lang') === "EN" && `Social Media` || sessionStorage.getItem('lang') === "RU" && `Социальные сети`}</p>
                                <div className="flexCont">
                                    <a target="blank" href="https://wa.me/994502263730"><img src={whatsapp} alt=""/> <p className="subTitle">+994 51 226 37 30</p></a>
                                    <a href="https://instagram.com/jobday.az?utm_medium=copy_link"><img src={instagram} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                    <a href="https://www.facebook.com/jobday.azerbaijan"><img src={facebook} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
