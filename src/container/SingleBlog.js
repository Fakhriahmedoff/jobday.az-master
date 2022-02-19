import React from 'react'
import singleVacancyPage from '../assets/css/singleBlog.css'
import jedaiFullBlueLogo from '../assets/image/jedaiFullBlueLogo.png'
import {Link, matchPath, useParams} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import lightBlueFlame from "../assets/image/lightBlueFlame.png"
import Button from "../components/Button"
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from '@material-ui/core';
import SearchBox from '../components/SearchBox';

function SingleBlog(props) {
    const linkMQ = useMediaQuery('(min-width:900px)');
    const mobileMQ = useMediaQuery('(min-width:900px)');

    const notify = () => toast.success(sessionStorage.getItem('lang') === "AZ" && `Sorğunuz Müvəffəqiyyətlə göndərildi!` || sessionStorage.getItem('lang') === "EN" && `Your request has been sent successfully!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос успешно отправлен!`);
    const notifyWarn = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `Sorğunuz artıq göndərilmişdir!` || sessionStorage.getItem('lang') === "EN" && `Your request has already been sent!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос уже отправлен!`);
    let { id } = useParams();
    const [UserData, setUserData] = useState(0)
    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }
    
    const [Blog, setBlog] = useState(0)
    useEffect(() => {
        axios.get(`https://jobday.az/api/blog/${id}` , props.headers )
        .then(res => setBlog(res.data))
        if(UserData?.id === undefined)
        {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    } , [])
    
    const imgHandler = {
        backgroundImage: `url(https://jobday.az/${Blog?.img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
    return (
        <div className="singleBlogPage">
            <SearchBox/>
            <div className="aboutUsCont">
                { 
                mobileMQ &&
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/about">{sessionStorage.getItem('lang') === "AZ" && `Faydalı Məlumat` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`} </Link> 
                    </p>
                }
                <div className="aboutText">
                    <div style={imgHandler} className="blogimage"></div>
                    <p className="title mainTitle">{Blog.title}</p>
                    <div className="text">
                        {Blog.content?.replace(/(<([^>]+)>)/gi, "")}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SingleBlog
